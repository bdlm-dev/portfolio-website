import {For, Suspense, createResource, createEffect, createSignal} from 'solid-js';

import { Position, PositionSkeleton } from './Position.tsx';
import '../styles/util.css';

const Positions = (props: { limit: number, isDev: boolean }) => {
    const url = `/api/positions?limit=${props.limit}&isDev=${props.isDev}`
    const [positions] = createResource(async () => await (await fetch(url)).json());
    const [errorMessage, setErrorMessage] = createSignal('');

    createEffect(() => {
        if (positions.state === 'ready') {
            if (positions().ok === false) {
                setErrorMessage("Internal Server Error")
            }
        }
    })

    return <>
        { errorMessage() ? (
                    <h2 class={"font-bold text-center"}>{errorMessage()}</h2>
                ) :
                <Suspense fallback={<PositionSkeleton n={3}/>}>
                    <For each={positions()}>
                        {(pos) => <Position content={pos}/>}
                    </For>
                </Suspense> }
    </>
};

export default function PositionSection(props: {isDev: boolean}) {
    return <div class={"py-4"}>
        <Positions limit={5} isDev={props.isDev}/>
    </div>;
}
