"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

// ============================================================================
// Types
// ============================================================================

interface Point {
    x: number;
    y: number;
}

interface Boundary {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    yMid: number;
    xMid: number;
    xl: number;
    xr: number;
    yb: number;
    yt: number;
}

type SceneType =
    | "introduction"
    | "multiple"
    | "memory"
    | "history"
    | "different-dimensions"
    | "new-beginnings"
    | "more-random";

interface GenerativeArtProps {
    /** Specific scenes to render. Defaults to all scenes. */
    scenes?: SceneType[];
    /** Additional CSS classes for the container */
    className?: string;
    /** Background color for the canvas. Defaults to white. */
    backgroundColor?: string;
    /** Foreground color for dots and strokes. Defaults to dark gray. */
    foregroundColor?: string;
    /** Enable debug logging. Defaults to false. */
    debug?: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const HPI = 0.5 * Math.PI;
const TWOPI = 2 * Math.PI;

const DEFAULT_SCENES: SceneType[] = [
    "introduction",
    "multiple",
    "memory",
    "history",
    "different-dimensions",
    "new-beginnings",
    "more-random",
];

// ============================================================================
// Utility Functions
// ============================================================================

function getCanvasSize(): { width: number; height: number } {
    if (typeof window === "undefined") {
        return { width: 800, height: 600 };
    }
    const width = Math.max(window.innerWidth - 60, 320);
    const height = Math.max(0.6 * window.innerHeight, 400);
    return { width, height };
}

function isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const mid = 0.5 * (rect.bottom + rect.top);
    return mid > 0 && mid < (window.innerHeight || document.documentElement.clientHeight);
}

function getBoundary(width: number, height: number): Boundary {
    const edgeX = (5 * width) / 100;
    const edgeTopY = 0.2 * height;
    const edgeBottomY = 0.2 * height;
    return {
        xl: 0,
        xr: width,
        yb: height,
        yt: 0,
        xMin: edgeX,
        xMax: width - edgeX,
        yMin: edgeTopY,
        yMax: height - edgeBottomY,
        yMid: 0.5 * (height - edgeBottomY + edgeTopY),
        xMid: 0.5 * (width - edgeX + edgeX),
    };
}

// Array utilities
function getNs(n: number, v: number): number[] {
    return Array(n).fill(v);
}

function getRndYLinspaceX(
    n: number,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
): Point[] {
    const res: Point[] = [];
    const s = (xMax - xMin) / n;
    let x = xMin;
    for (let i = 0; i < n; i++) {
        res.push({ x, y: yMin + Math.random() * (yMax - yMin) });
        x += s;
    }
    return res;
}

function getLinspaceYLinspaceX(
    n: number,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
): Point[] {
    const res: Point[] = [];
    const sX = (xMax - xMin) / n;
    const sY = (yMax - yMin) / n;
    let x = xMin;
    let y = yMin;
    for (let i = 0; i < n; i++) {
        res.push({ x, y });
        x += sX;
        y += sY;
    }
    return res;
}

function getCirc(n: number, ix: number, iy: number, rad: number): Point[] {
    const res: Point[] = [];
    const d = TWOPI / n;
    let a = 0;
    for (let i = 0; i < n; i++) {
        res.push({
            x: ix + Math.cos(a) * rad,
            y: iy + Math.sin(a) * rad,
        });
        a += d;
    }
    return res;
}

function getRndCirc(n: number, ix: number, iy: number, rad: number): Point[] {
    const res: Point[] = [];
    for (let i = 0; i < n; i++) {
        const a = Math.random() * TWOPI;
        res.push({
            x: ix + Math.cos(a) * rad,
            y: iy + Math.sin(a) * rad,
        });
    }
    return res;
}

function permuteY(path: Point[], noise: number): Point[] {
    return path.map(({ x, y }) => ({
        x,
        y: y + (1 - 2 * Math.random()) * noise,
    }));
}

function permute(arr: number[], noise: number): number[] {
    return arr.map((v) => v + (1 - 2 * Math.random()) * noise);
}

function limit(v: number, ma: number, mi: number): number {
    return Math.max(Math.min(v, ma), mi);
}

// Drawing utilities
function clear(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
): void {
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
}

function drawDots(
    _ctx: CanvasRenderingContext2D,
    _points: Point[],
    _rad: number,
    _fill: boolean
): void {
    // Dot drawing disabled as per user request: "remove the dots"
}

// ============================================================================
// Scene Generators
// ============================================================================

function createSceneUniformSingle(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = fgColor;
    ctx.lineWidth = 2;

    const boundary = getBoundary(width, height);
    const num = 1;
    const dotSize = 20;
    const frames = 30;

    let path1 = getLinspaceYLinspaceX(
        num,
        boundary.xMid,
        boundary.xMid,
        boundary.yMid,
        boundary.yMid
    );
    let path2 = getRndYLinspaceX(
        num,
        boundary.xMid,
        boundary.xMid,
        boundary.yMin,
        boundary.yMax
    );
    let itt = 0;

    return function scene(): void {
        itt += 1;
        ctx.fillStyle = bgColor;
        clear(ctx, width, height);
        ctx.fillStyle = fgColor;

        if (itt % frames === 0) {
            path1 = path2;
            path2 = getRndYLinspaceX(
                num,
                boundary.xMid,
                boundary.xMid,
                boundary.yMin,
                boundary.yMax
            );
        }

        const y1 = path1[0].y;
        const y2 = path2[0].y;
        const path: Point[] = [
            {
                x: path1[0].x,
                y: y1 + Math.sin(((itt % frames) / frames) * HPI) * (y2 - y1),
            },
        ];

        drawDots(ctx, path, dotSize, true);
        drawDots(ctx, path2, dotSize, false);
    };
}

function createSceneUniformMulti(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = fgColor;
    ctx.lineWidth = 2;

    const boundary = getBoundary(width, height);
    const num = Math.floor(width / 20);
    const dotSize = 4;
    const frames = 120;

    let path1 = getLinspaceYLinspaceX(
        num,
        boundary.xMin,
        boundary.xMax,
        boundary.yMid,
        boundary.yMid
    );
    let path2 = getRndYLinspaceX(
        num,
        boundary.xMin,
        boundary.xMax,
        boundary.yMin,
        boundary.yMax
    );
    let itt = 0;

    return function scene(): void {
        itt += 1;
        ctx.fillStyle = bgColor;
        clear(ctx, width, height);
        ctx.fillStyle = fgColor;

        if (itt % frames === 0) {
            path1 = path2;
            path2 = getRndYLinspaceX(
                num,
                boundary.xMin,
                boundary.xMax,
                boundary.yMin,
                boundary.yMax
            );
        }

        const path: Point[] = [];
        for (let i = 0; i < num; i++) {
            const y1 = path1[i].y;
            const y2 = path2[i].y;
            path.push({
                x: path1[i].x,
                y: y1 + Math.sin(((itt % frames) / frames) * HPI) * (y2 - y1),
            });
        }

        drawDots(ctx, path, dotSize, true);
        drawDots(ctx, path2, dotSize, false);
    };
}

function createSceneUniformLocal(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = bgColor;
    ctx.lineWidth = 2;

    const boundary = getBoundary(width, height);
    const num = Math.floor(width / 20);
    const dotSize = 4;
    const noise = 2;

    let path = getLinspaceYLinspaceX(
        num,
        boundary.xMin,
        boundary.xMax,
        boundary.yMid,
        boundary.yMid
    );

    return function scene(): void {
        ctx.fillStyle = bgColor;
        clear(ctx, width, height);
        ctx.fillStyle = fgColor;
        path = permuteY(path, noise);
        drawDots(ctx, path, dotSize, true);
    };
}

function createSceneXVelExpose(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.lineWidth = 1;
    ctx.fillStyle = bgColor;
    clear(ctx, width, height);
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = "rgba(43,95,111,0.05)";

    const boundary = getBoundary(width, height);
    const num = Math.floor(width);
    const dotSize = 1;
    const noise = 0.01;

    let path = getLinspaceYLinspaceX(
        num,
        boundary.xMin,
        boundary.xMax,
        boundary.yMid,
        boundary.yMid
    );
    let velocity = getNs(num, 0);

    return function scene(): void {
        velocity = permute(velocity, noise);
        let s = 0;
        path = path.map(({ x, y }, i) => {
            s += velocity[i];
            return { x, y: limit(y + s, boundary.yb, boundary.yt) };
        });
        drawDots(ctx, path, dotSize, true);
    };
}

function createSceneXYVelExpose(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.lineWidth = 1;
    ctx.fillStyle = bgColor;
    clear(ctx, width, height);
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = "rgba(43,95,111,0.05)";

    const boundary = getBoundary(width, height);
    const num = Math.floor(width);
    const dotSize = 1;
    const noise = 0.01;

    let path = getLinspaceYLinspaceX(
        num,
        boundary.xMin,
        boundary.xMax,
        boundary.yMid,
        boundary.yMid
    );
    let velx = getNs(num, 0);
    let vely = getNs(num, 0);

    return function scene(): void {
        velx = permute(velx, noise);
        vely = permute(vely, noise);
        let sx = 0;
        let sy = 0;
        path = path.map(({ x, y }, i) => {
            sx += velx[i];
            sy += vely[i];
            return {
                x: limit(x + sx, boundary.xr, boundary.xl),
                y: limit(y + sy, boundary.yb, boundary.yt),
            };
        });
        drawDots(ctx, path, dotSize, true);
    };
}

function createSceneCircVelExpose(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.lineWidth = 1;
    ctx.fillStyle = bgColor;
    clear(ctx, width, height);
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = "rgba(43,95,111,0.05)";

    const boundary = getBoundary(width, height);
    const num = Math.floor(width);
    const dotSize = 1;
    const noise = 0.01;
    const rad = Math.min(0.2 * width, 0.2 * height);

    let path = getCirc(num, boundary.xMid, boundary.yMid, rad);
    let velx = getNs(num, 0);
    let vely = getNs(num, 0);

    return function scene(): void {
        velx = permute(velx, noise);
        vely = permute(vely, noise);
        let sx = 0;
        let sy = 0;
        path = path.map(({ x, y }, i) => {
            sx += velx[i];
            sy += vely[i];
            return {
                x: limit(x + sx, boundary.xr, boundary.xl),
                y: limit(y + sy, boundary.yb, boundary.yt),
            };
        });
        drawDots(ctx, path, dotSize, true);
    };
}

function createSceneRndCircVelExpose(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bgColor: string,
    fgColor: string
): () => void {
    ctx.lineWidth = 1;
    ctx.fillStyle = bgColor;
    clear(ctx, width, height);
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = "rgba(43,95,111,0.05)";

    const boundary = getBoundary(width, height);
    const num = Math.floor(width);
    const dotSize = 1;
    const noise = 0.01;
    const rad = Math.min(0.2 * width, 0.2 * height);

    let path = getRndCirc(num, boundary.xMid, boundary.yMid, rad);
    let velx = getNs(num, 0);
    let vely = getNs(num, 0);

    return function scene(): void {
        velx = permute(velx, noise);
        vely = permute(vely, noise);
        let sx = 0;
        let sy = 0;
        path = path.map(({ x, y }, i) => {
            sx += velx[i];
            sy += vely[i];
            return {
                x: limit(x + sx, boundary.xr, boundary.xl),
                y: limit(y + sy, boundary.yb, boundary.yt),
            };
        });
        drawDots(ctx, path, dotSize, true);
    };
}

// Scene factory map
const SCENE_FACTORIES: Record<
    SceneType,
    (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        bgColor: string,
        fgColor: string
    ) => () => void
> = {
    introduction: createSceneUniformSingle,
    multiple: createSceneUniformMulti,
    memory: createSceneUniformLocal,
    history: createSceneXVelExpose,
    "different-dimensions": createSceneXYVelExpose,
    "new-beginnings": createSceneCircVelExpose,
    "more-random": createSceneRndCircVelExpose,
};

// ============================================================================
// Component
// ============================================================================

/**
 * GenerativeArt Component
 *
 * Creates canvas-based generative art visualizations with multiple scene types.
 * Animations are optimized to only run when in viewport and properly cleanup on unmount.
 *
 * @example
 * ```tsx
 * // Render all scenes
 * <GenerativeArt />
 *
 * // Render specific scenes
 * <GenerativeArt scenes={["introduction", "memory"]} />
 *
 * // Custom colors
 * <GenerativeArt
 *   backgroundColor="rgba(0, 0, 0, 1)"
 *   foregroundColor="rgba(255, 255, 255, 0.8)"
 * />
 * ```
 */
export function GenerativeArt({
    scenes = DEFAULT_SCENES,
    className,
    backgroundColor = "rgba(255, 255, 255, 1.0)",
    foregroundColor = "rgba(43, 95, 111, 0.6)",
    debug = false,
}: GenerativeArtProps) {
    // Store animation frame IDs and event handlers for cleanup
    const animationFrameIds = useRef<Map<string, number>>(new Map());
    const scrollHandlers = useRef<Map<string, () => void>>(new Map());
    const clickHandlers = useRef<Map<string, () => void>>(new Map());

    const log = useCallback(
        (...args: unknown[]) => {
            if (debug) {
                console.log("[GenerativeArt]", ...args);
            }
        },
        [debug]
    );

    useEffect(() => {
        // Animation loop with stored frame ID
        function animloop(
            sceneFn: () => void,
            canvasId: string,
            frameIds: Map<string, number>
        ): void {
            const frameId = requestAnimationFrame(() =>
                animloop(sceneFn, canvasId, frameIds)
            );
            frameIds.set(canvasId, frameId);
            sceneFn();
        }

        // Initialize and start a canvas scene
        function initializeCanvas(
            sceneName: SceneType,
            sceneFactory: (typeof SCENE_FACTORIES)[SceneType]
        ): void {
            const canvasId = `canvas-${sceneName}`;
            const containerId = `container-${sceneName}`;
            const { width, height } = getCanvasSize();

            const container = document.getElementById(containerId);
            if (!container) {
                log(`Container not found: ${containerId}`);
                return;
            }

            // Create canvas element
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.id = canvasId;
            canvas.className = "drawing";
            canvas.style.display = "block";
            canvas.style.width = "100%";
            canvas.style.height = "auto";

            // Clear container and append canvas
            container.innerHTML = "";
            container.appendChild(canvas);

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                log(`Failed to get 2D context for: ${canvasId}`);
                return;
            }

            // Create scene with colors
            const scene = sceneFactory(ctx, width, height, backgroundColor, foregroundColor);

            // Scroll handler to pause/resume animations based on viewport
            const scrollHandler = (): void => {
                const inView = isInViewport(container);
                const hasAnimation = animationFrameIds.current.has(canvasId);

                if (inView && !hasAnimation) {
                    log(`Starting: ${canvasId}`);
                    animloop(scene, canvasId, animationFrameIds.current);
                } else if (!inView && hasAnimation) {
                    log(`Stopping: ${canvasId}`);
                    const frameId = animationFrameIds.current.get(canvasId);
                    if (frameId !== undefined) {
                        cancelAnimationFrame(frameId);
                        animationFrameIds.current.delete(canvasId);
                    }
                }
            };

            // Click handler to reset the scene
            const clickHandler = (): void => {
                // Cleanup current handlers
                window.removeEventListener("scroll", scrollHandler, false);
                canvas.removeEventListener("click", clickHandler, false);

                // Cancel current animation
                const frameId = animationFrameIds.current.get(canvasId);
                if (frameId !== undefined) {
                    log(`Resetting: ${canvasId}`);
                    cancelAnimationFrame(frameId);
                    animationFrameIds.current.delete(canvasId);
                }

                // Reinitialize
                initializeCanvas(sceneName, sceneFactory);
            };

            // Store handlers for cleanup
            scrollHandlers.current.set(canvasId, scrollHandler);
            clickHandlers.current.set(canvasId, clickHandler);

            // Start animation if in viewport
            if (isInViewport(container)) {
                animloop(scene, canvasId, animationFrameIds.current);
            }

            // Attach event listeners
            window.addEventListener("scroll", scrollHandler, { passive: true });
            canvas.addEventListener("click", clickHandler, false);
        }

        // Initialize all scenes
        scenes.forEach((sceneName) => {
            const factory = SCENE_FACTORIES[sceneName];
            if (factory) {
                log(`Initializing: ${sceneName}`);
                initializeCanvas(sceneName, factory);
            }
        });

        // Cleanup function
        return () => {
            log("Cleaning up GenerativeArt");

            // Cancel all animation frames
            animationFrameIds.current.forEach((frameId, canvasId) => {
                log(`Canceling animation: ${canvasId}`);
                cancelAnimationFrame(frameId);
            });
            animationFrameIds.current.clear();

            // Remove scroll handlers
            scrollHandlers.current.forEach((handler) => {
                window.removeEventListener("scroll", handler, false);
            });
            scrollHandlers.current.clear();

            // Remove click handlers
            clickHandlers.current.forEach((handler, canvasId) => {
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    canvas.removeEventListener("click", handler, false);
                }
            });
            clickHandlers.current.clear();
        };
    }, [scenes, backgroundColor, foregroundColor, log]);

    return (
        <section className={cn("w-full", className)}>
            {scenes.map((sceneName) => (
                <div
                    key={sceneName}
                    className="canvas-container"
                    id={`container-${sceneName}`}
                    aria-label={`Generative art visualization: ${sceneName}`}
                />
            ))}
        </section>
    );
}

export default GenerativeArt;
