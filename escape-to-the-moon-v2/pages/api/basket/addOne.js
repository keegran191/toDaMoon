import db from "../../../lib/database";

export default async function handler(req, res) {
    const id = req.query.id;
    const pool = await db.getConnection();

    try {
        // Check if the combination of id already exists in the basket table.
        const [existingRows] = await pool.query(
            'SELECT * FROM basket WHERE id = ?',
            [id]
        );

        if (existingRows.length > 0) {
            // If the combination exists, decrement the stockAmount for that row.
            await pool.query(
                'UPDATE basket SET stockAmount = stockAmount + 1 WHERE id = ?',
                [id]
            );
            pool.destroy();
            res.status(200).json({ "Status": "StockAmount updated successfully." });
        } else {
            // If the combination doesn't exist, return an error response or any other desired behavior.
            pool.destroy();
            res.status(404).json({ "Status": "Combination not found in the basket." });
        }
    } catch (err) {
        console.error(err);
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
    }
}
