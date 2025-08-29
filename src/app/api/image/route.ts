import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File;
        const prompt = formData.get("prompt") as string;

        if (!file || !prompt) {
            return NextResponse.json({ error: "Image and prompt are required" }, { status: 400 });
        }

        const client = await Client.connect("multimodalart/Qwen-Image-Edit-Fast");

        const result = await client.predict("/infer", {
            image: file,
            prompt,
            seed: 0,
            randomize_seed: true,
            true_guidance_scale: 1,
            num_inference_steps: 8,
            rewrite_prompt: true,
        });

        const output = (result.data as any[])[0];
        return NextResponse.json({ output });
    } catch (error: Error | unknown) {
        console.error("Image Edit Error:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Something went wrong" },
            { status: 500 }
        );
    }
}
