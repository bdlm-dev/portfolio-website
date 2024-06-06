import {For} from "solid-js";
import {Dynamic} from "solid-js/web";
import { FiArrowUpRight } from 'solid-icons/fi'
import { SiGithub } from 'solid-icons/si'

import {icon_map, label_map} from "./icons.js";
import '../styles/util.css'

interface ProjectContent {
    id: string,
    created: string,
    title: string,
    description: string,
    priority: number,
    image_url: string,
    tech: string[],
    url: string[]
}

export const Project = (props: { content: ProjectContent }) => {

    const has_links = props.content.url.length !== 0;

    let main_link : string | undefined, github_link : string | undefined;
    if (has_links) {
        main_link = props.content.url.find((link) => link.toLowerCase().includes("main:"))
        main_link = main_link?.substring(5);
        if (props.content.url.length > 1) {
            github_link = props.content.url.find((link) => link.toLowerCase().includes("github"))
        }
    }

    return (
        <div class="flex-grow flex flex-col gap-1 rounded-sm text-neutral-100 bg-cover"
             style={{"background-image": `url('${props.content.image_url}')`}}>

            <div class={"flex flex-row items-center"}>
                <span class={"font-medium flex-grow"}>
                    {props.content.title}
                </span>
                <span class={"text-sm text-neutral-500"}>
                    {props.content.created}
                </span>
            </div>

            <Tech stack={props.content.tech} project={props.content.id}/>

            <span class={"text-sm"}>
                {props.content.description}
            </span>

            { !has_links ? "" :
                    <div class={"flex place-items-center"}>
                        { main_link === undefined ? "" :
                            <a
                            class={"grey-hover underline hover:text-neutral-200 active:text-sky-600 text-sm cursor-pointer"}
                            href={main_link}
                            target="_blank"
                            rel="external noreferrer">
                                Visit project
                                <FiArrowUpRight class={"inline-block w-3 h-3 mb-2"}/>
                            </a>
                        }
                        { github_link === undefined ? "" :
                            <a
                                class={"grey-hover ml-auto cursor-pointer"}
                                aria-label={`${props.content.title} github link`}
                                href={github_link}
                                target="_blank"
                                rel="external noreferrer">
                                <SiGithub class={"w-6 h-6"}/>
                            </a>
                        }
                    </div>
            }
        </div>
    );
};

const Tech = (props: { stack: string[], project: string }) => {

    const Icon = (props: { id: string }) => {
        return <div class={"has-tooltip relative"}>
            <i aria-label={label_map[props.id]}>
                <Dynamic class="w-6 h-6" component={icon_map[props.id]}/>
            </i>
            <div aria-hidden="true"
                 class="tooltip mt-1 transform ml-3 -translate-x-1/2 w-fit whitespace-nowrap rounded-sm bg-neutral-700
                 opacity-95 py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
                {label_map[props.id]}
            </div>
        </div>
    }

    return <div class={"project-tech flex-grow flex flex-wrap gap-1"}>
        <For each={props.stack}>
            {(value) => <Icon id={value}/>}
        </For>
    </div>
}

export const ProjectSkeleton = (props: { n: number }) => {
    const Skeleton = (props: { index: number }) => <div class={"h-32 flex-grow flex flex-row"}>
        <div class={"m-2 rounded-md flex-grow bg-neutral-800 animate-pulse"}
             style={{"animation-delay": `${props.index * 500}ms`}}></div>
        <div class={"m-2 rounded-md bg-neutral-800 animate-pulse"}
             style={{width: "40px", "animation-delay": `${props.index * 500}ms`}}></div>
    </div>
    return <For each={Array.from({length: props.n})}>
        {(_, index) => <Skeleton index={index()}/>}
    </For>
}
