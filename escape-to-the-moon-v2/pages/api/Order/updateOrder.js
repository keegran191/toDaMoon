import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();

    const orderId = req.query.orderId
    const orderStatus = req.query.orderStatus
    const orderShipment = req.query.orderShipment
    const orderCode = req.query.orderCode

    console.log("Id" + orderId + "Status" +  orderStatus + "Shipment" +  orderShipment + "Code" + orderCode)

    const [results] = await pool.query('UPDATE order_list SET order_status = ?, order_shipment = ?, order_code = ? WHERE order_Id = ?',[orderStatus,orderShipment,orderCode,orderId]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    pool.destroy();
    res.status(200).json({"Status": "UpdateComplete"});
}