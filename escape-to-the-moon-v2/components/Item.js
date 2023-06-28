function UniverSalItem({
    IdStock
}) {

    const GetStock = () => {
        Axios.get(`http://localhost:3000/api/stock/get/${IdStock}`).then((response) => {
            setSubCategoryList(response.data);
        })
    }
    
    useEffect(() => {
        GetStock()
    });
    
    return(
        <div className="">
            {IdStock}
        </div>
    )
}