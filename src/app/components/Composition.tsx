import {inferProcedureOutput} from "@trpc/server";
import {AppRouter} from "@/server/api/root";

interface GuideProps<T> {
    civDetails?: () => inferProcedureOutput<AppRouter["civilization"]["getCivilizationDetails"]>;
    unitDetails?: () => inferProcedureOutput<AppRouter["unit"]["getUnitDetails"]>;

}

export const Composition = <T,>({
    civDetails,
    unitDetails,
}: GuideProps<T>) => {
    return (
        <div>
            <ul>
                <li>

                </li>
            </ul>
        </div>
    )
}
