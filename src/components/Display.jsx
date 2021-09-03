export const Display = (props) => {
    const { input } = props
    return (
        <div className="flex justify-end">
            <span id='display' className='text-right text-lg  mb-2 overflow-ellipsis'>{input}</span>
        </div>
    )
}

export default Display