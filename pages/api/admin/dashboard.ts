import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type message = {
    numberOfOrders         : number;
    paidOrders             : number;
    notPaidOrders          : number;
    numberOfClients        : number;
    numberOfProducts       : number;
    productsWithNoInventary: number;
    lowInventary           : number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<message>) {

    await db.connect();

    // const numberOfOrders = await Order.count();
    // const paidOrders = await Order.find({ isPaid : true }).count();
    // const numberOfClients = await User.find({ role: 'client' }).count();
    // const numberOfProducts = await Product.count();
    // const productsWithNoInventary= await Product.find({ inStock: 0 }).count();
    // const lowInventary = await Product.find({ inStock: { $lte: 10 } }).count();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventary,
        lowInventary,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid : true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count(),
    ]);

    await db.disconnect();

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventary,
        lowInventary,
        notPaidOrders: numberOfOrders - paidOrders,
    });
}