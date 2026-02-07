import { Spinner } from "../ui/spinner"

function FullScreenLoader() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Spinner className="h-10 w-10" />
        </div>
    )
}

export default FullScreenLoader