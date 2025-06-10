interface IHeading {
    title: string
}

export function Heading({title}: IHeading) {
    return (
        <h2 className='text-3xl font-medium mb-4 text-center'>{title}</h2>
    )
}
