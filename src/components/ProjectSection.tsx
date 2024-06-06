import {createEffect, createResource, createSignal, For, Suspense} from "solid-js";
import {Project, ProjectSkeleton} from "./Project.tsx";

const Projects = (props: { limit: number, isDev: boolean }) => {
    const url = `/api/projects?limit=${props.limit}&isDev=${props.isDev}`
    const [projects] = createResource(async () => await (await fetch(url)).json());
    const [errorMessage, setErrorMessage] = createSignal('');

    createEffect(() => {
        if (projects.state === 'ready') {
            if (projects().ok === false) {
                setErrorMessage("Internal Server Error")
            }
        }
    })

    return <>
        { errorMessage() ? (
                <h2 class={"font-bold text-center"}>{errorMessage()}</h2>
            ) :
            <Suspense fallback={<ProjectSkeleton n={2}/>}>
                <For each={projects()}>
                    {(pos, i) => <Project content={pos}/>}
                </For>
            </Suspense>
        }
    </>
};

export default function ProjectSection(props: {isDev: boolean}) {
    return <>
        <div class={"grid grid-cols-2 gap-6"}>
            <Projects limit={2} isDev={props.isDev}/>
        </div>
    </>
}