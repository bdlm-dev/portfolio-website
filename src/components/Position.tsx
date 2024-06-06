import {For} from "solid-js";

interface PositionContent {
    id: string,
    employer?: string,
    title: string,
    location?: string,
    type?: string,
    start: string,
    end?: string
}

export const Position = (props: { content: PositionContent }) => {
    const headline = `${props.content.title} ${props.content.employer !== null ? `at ${props.content.employer}` : ""}`

    return (
        <div class="w-full flex flex-row justify-between">
            <span class="text-neutral-100 flex-grow" aria-label={headline}>
                {props.content.title}
                {props.content.employer !== null ? <><span class="text-neutral-500 px-1">@</span>{props.content.employer}</> : ""}
            </span>
            <span class="ml-auto text-neutral-400 text-nowrap" aria-label={props.content.end != null ? `From ${props.content.start} to ${props.content.end}` : `From ${props.content.start} until present`}>
                <span class={"hover:text-neutral-300"}>{props.content.start}</span>
                <span>
                    {
                        props.content.end == "" ?
                            " ~" :
                            <> - <span class={"hover:text-neutral-300"}>{props.content.end}</span></>
                    }
                </span>
            </span>
        </div>
    );
};

export const PositionSkeleton = (props: { n: number }) => {
    const Skeleton = (props: {index: number}) => <div class={"h-8 flex-grow flex"}>
        <div class={"m-2 rounded-md flex-grow bg-neutral-800 animate-pulse"} style={{"animation-delay": `${props.index * 500}ms`}}></div>
        <div class={"m-2 rounded-md bg-neutral-800 animate-pulse"} style={{width: "40px", "animation-delay": `${props.index * 500}ms`}}></div>
    </div>
    return <For each={Array.from({length: props.n})}>
        {(_, index) => <Skeleton index={index()}/>}
    </For>
}
