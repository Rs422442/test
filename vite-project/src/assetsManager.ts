import * as UTILS from "@pixi/utils";
import * as PIXI from "pixi.js";

type atlassheet = [name: string, path: string];

export default class AssetManager {
	resources: any;
	assetsloader = PIXI.Loader.shared;
	promises: Promise<void>[] = [];

	constructor() {}

	async preload(atlas: atlassheet[], callback: CallableFunction): Promise<void> {
		this.promises.push(
			new Promise<void>((resolve, _reject) => {
				atlas.forEach((value) => {
					this.assetsloader.add(value[0], value[1]);
					console.warn("sprite add " + value[0] + " " + value[1]);
				});

				this.assetsloader.load((_assetsloader, _resources) => {
					this.resources = _resources;
					for (let key in _resources) {
						if (_resources[key].error) {
							console.error(
								`${_resources[key].name}\nnot find by url: ${_resources[key].url}`
							);
						}
					}
					console.warn("all sprites loaded");
					console.warn(_resources);
					resolve();
				});
			})
		);

		await Promise.all(this.promises)
			.then((_result) => callback())
			.catch((_err) => console.warn("error loading resources"));
	}

	private getTextureFromResources(
		resources: UTILS.Dict<PIXI.Texture<PIXI.Resource>>,
		key: string,
		frame?: string
	): PIXI.Texture {
		if (frame) {
			if (!(resources[key] as any).data.frames[frame].frame) {
				console.error(`[getTexture]: В ${key} нет ${frame}`);
			}
			return (resources[key] as any).data.frames[frame].frame.texture;
		}

		if (!key) {
			console.error("Не указано имя атласа для текстуры");
			return PIXI.Texture.EMPTY;
		}

		if (!(resources[key] as any)) {
			console.error(`[getTexture]: Нет ${key}`);
		}

		return (resources[key] as any).texture;
	}

	getTexture(key: string, frame?: string): PIXI.Texture {
		return this.getTextureFromResources(this.resources, key, frame);
	}
}