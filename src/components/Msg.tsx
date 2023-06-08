type Props = {
    type: 'nodata' | 'error',
}

const Msg = ({ type } : Props) => {
    return (
        <div className="flex flex-col m-5 items-center justify-center h-full">
            {
                type === 'nodata' ? 
                    <>
                        <span className="text-3xl m-1 text-gray-500">No data</span>
                        <span className="bx bx-file-blank text-9xl m-1 text-gray-500" />
                    </> :
                    <>
                        <span className="text-3xl m-1 text-red-300">Something went wrong!</span>
                        <span className="bx bx-error-alt text-9xl m-1 text-red-300" />
                    </>
            }
        </div>
    )
}

export default Msg