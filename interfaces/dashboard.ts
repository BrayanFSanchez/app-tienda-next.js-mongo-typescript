
export interface DashboardSummaryResponse {
    numberOfOrders:          number;
    paidOrders:              number;
    numberOfClients:         number;
    numberOfProducts:        number;
    productsWithNoInventary: number;
    lowInventary:            number;
    notPaidOrders:           number;
}