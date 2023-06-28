function UniverSalItem({
    id
}) {

    const GetStock = () => {
        Console.log(id)
    }
    
    useEffect(() => {
        GetStock()
    });
    
    return(
        <div className="">
            {id}
        </div>
    )
}