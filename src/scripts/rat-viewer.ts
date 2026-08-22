import {
	AbstractMesh,
	ArcRotateCamera,
	Color4,
	Engine,
	HemisphericLight,
	Scene,
	SceneLoader,
	TransformNode,
	Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const canvasCleanup = new WeakMap<HTMLCanvasElement, () => void>();

export function initRatViewer(canvas: HTMLCanvasElement): () => void {
	const existingCleanup = canvasCleanup.get(canvas);
	if (existingCleanup) existingCleanup();

	const engine = new Engine(canvas, true, {
		alpha: true,
		antialias: true,
	});

	const scene = new Scene(engine);
	scene.clearColor = new Color4(0, 0, 0, 0);

	const camera = new ArcRotateCamera(
		"camera",
		-Math.PI / 2,
		Math.PI / 2.5,
		2.4,
		Vector3.Zero(),
		scene,
	);
	camera.lowerRadiusLimit = 2.4;
	camera.upperRadiusLimit = 2.4;
	camera.inputs.clear();

	new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	const orientPivot = new TransformNode("orient-pivot", scene);
	const spinPivot = new TransformNode("spin-pivot", scene);
	spinPivot.parent = orientPivot;
	orientPivot.rotation.z = Math.PI;

	void SceneLoader.ImportMeshAsync("", "/rat.glb", "", scene)
		.then((result) => {
			const root = result.meshes[0];
			if (!root) return;

			root.parent = spinPivot;

			let min = new Vector3(
				Number.MAX_VALUE,
				Number.MAX_VALUE,
				Number.MAX_VALUE,
			);
			let max = new Vector3(
				-Number.MAX_VALUE,
				-Number.MAX_VALUE,
				-Number.MAX_VALUE,
			);

			for (const mesh of result.meshes) {
				if (!(mesh instanceof AbstractMesh)) continue;
				mesh.computeWorldMatrix(true);
				const { minimumWorld, maximumWorld } =
					mesh.getBoundingInfo().boundingBox;
				min = Vector3.Minimize(min, minimumWorld);
				max = Vector3.Maximize(max, maximumWorld);
			}

			const center = Vector3.Center(min, max);
			const maxDim = Math.max(max.x - min.x, max.y - min.y, max.z - min.z);
			const scale = maxDim > 0 ? 1.35 / maxDim : 1;

			root.position.copyFromFloats(-center.x, -center.y, -center.z);
			root.scaling.setAll(scale);
		})
		.catch((error: unknown) => {
			console.error("Failed to load rat.glb", error);
		});

	engine.runRenderLoop(() => {
		spinPivot.rotation.y += 0.012;
		scene.render();
	});

	const resize = () => engine.resize();
	resize();

	const observer = new ResizeObserver(resize);
	observer.observe(canvas);

	const cleanup = () => {
		observer.disconnect();
		scene.dispose();
		engine.dispose();
		canvasCleanup.delete(canvas);
	};

	canvasCleanup.set(canvas, cleanup);
	return cleanup;
}
