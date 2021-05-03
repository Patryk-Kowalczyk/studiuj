import React from "react";
import DashboardAuth from "../../components/dashboard/DashboardAuth";
import Checkout from "../../components/add/Checkout";

export default function addAdvertisement() {
    return <Checkout/>;
}

addAdvertisement.Layout = DashboardAuth;
