import { Series } from 'remotion';
import { compositionIdToEntry } from './compositionRegistry';

export type Shot = {
    compositionId: string;
    compositionProps: Record<string, unknown>;
    fromFrame: number;
    durationInFrames: number;
};

export type MasterSequenceProps = {
    shots: Shot[];
};

export const MasterSequenceComp: React.FC<MasterSequenceProps> = ({ shots }) => {

    return (
        <Series>
            {shots.map((shot: Shot, i: number) => {
                const key = `shot-${i}`;
                const entry = compositionIdToEntry[shot.compositionId];
                if (!entry) return null;

                const Component: any = entry.component as any;
                return (
                    <Series.Sequence key={key} durationInFrames={shot.durationInFrames}>
                        <Component {...(shot.compositionProps || {})} />
                    </Series.Sequence>
                );
            })}
        </Series>
    );
};

export default MasterSequenceComp;