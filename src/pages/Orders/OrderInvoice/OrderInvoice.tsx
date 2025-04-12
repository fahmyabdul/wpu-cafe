import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image as PdfImage,
    Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@heroui/react";

import { IOrderCart } from "../../../types/Orders";
import ordersServices from "../../../services/orders.service";
import cafeLogoLight from "../../../assets/cafe-logo-l.png";
import loadingGif from "../../../assets/wpu-my.gif";

Font.register({ family: "OpenSans", fonts: [
        { src: "http://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf" },
        { src: "http://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf", fontWeight: 600 },
        { src: "http://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf", fontWeight: 700 }
    ]
});

const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    page: {
        backgroundColor: "#ffffff",
        color: "black",
        fontFamily: "OpenSans",
        fontSize: 11,
    },
    header: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        padding: 30,
    },
    headerLogo: {
        flex: 1,
    },
    headerText: {
        flex: 1,
        textAlign: "right",
    },
    section: {
        padding: 30,
        paddingTop: 0,
        gap: 4,
    },
    table: {
        width: "auto", 
        gap: 8,
    },
    tableRow: { 
        flexDirection: "row", 
        paddingHorizontal: 15,
    }, 
    tableCol: { 
        width: "25%", 
        borderStyle: "solid", 
    }, 
    tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
    },
    tableHeader: {
        fontWeight: 700, 
        backgroundColor: "#009689",
        color: "white",
        paddingVertical: 10,
        borderRadius: 10,
    },
    tableFooter: {
        fontWeight: 700,
        borderStyle: "solid", 
        borderColor: "#e0e0e0",
        borderTopWidth: 1.5, 
        paddingVertical: 10,
    }
});

const OrderInvoice = () => {
    const { id } = useParams();
    useEffect(() => {
        document.title = `WPU Cafe | Invoice`;
    }, [id]);

    const {
        data: orderDetail,
        isLoading
    } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            if (!id){
                return [];
            }
            const result = await ordersServices.getById(id)
            .then((res) => res.data)
            .then((data) => {
                const date = new Date(data["created_at"]);
                const dateFormatted = format(date, "MMMM do, yyyy hh:mm a");
    
                data["created_at"] = dateFormatted;

                return data;
            })
            .catch(() => {});

            return result;
        },
    });

    return (
        <>
            {isLoading && 
                (
                    <section className="flex min-h-screen tracking-wider bg-teal-600 body-font">
                        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
                            <Image
                                src={loadingGif}
                                className="mx-auto -left-4 xl:-left-5 w-[80%] xl:w-[50%] mb-2"
                            />
                        </div>
                    </section>
                )
            }
            {!isLoading && (!orderDetail || orderDetail.status !== "COMPLETED") && 
                (
                    <Navigate to="/notfound"/>
                )
            }
            {!isLoading && orderDetail &&
            (
                <PDFViewer style={styles.viewer}>
                    {/* Start of the document*/}
                    <Document title={`Invoice | ${orderDetail.id}`}>
                    {/*render a single page*/}
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>
                            <View style={styles.headerLogo}>
                                <PdfImage
                                    src={cafeLogoLight}
                                    style={{ width: "100px" }}
                                />
                            </View>
                            <View style={styles.headerText}>
                                <Text
                                    style={{ fontWeight: 700 }}
                                >
                                    INVOICE
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#009689" }}
                                >{orderDetail.id}</Text>
                            </View>
                        </View>
                        <View style={[styles.section, {marginTop: 30}]}>
                            <View style={styles.table}>
                                <View style={[styles.tableRow, {paddingHorizontal: 0}]}>
                                    <View style={[styles.tableCol, {width: "20%"}]}>
                                        <Text>Customer Name</Text>
                                    </View>
                                    <View style={[styles.tableCol, {width:"2%"}]}>
                                        <Text>:</Text>
                                    </View>
                                    <View style={[styles.tableCol, {width:"50%", fontWeight: 700}]}>
                                        <Text>{orderDetail.customer_name}</Text>
                                    </View>
                                </View>
                                <View style={[styles.tableRow, {paddingHorizontal: 0}]}>
                                    <View style={[styles.tableCol, {width: "20%"}]}>
                                        <Text>Ordered At</Text>
                                    </View>
                                    <View style={[styles.tableCol, {width:"2%"}]}>
                                        <Text>:</Text>
                                    </View>
                                    <View style={[styles.tableCol, {width:"50%", fontWeight: 700}]}>
                                        <Text>{orderDetail.created_at}</Text>
                                    </View>
                                </View>
                                <View style={[styles.tableRow, {paddingHorizontal: 0}]}>
                                    <View style={[styles.tableCol, {width: "20%"}]}>
                                        <Text>Table Number</Text>
                                    </View>
                                    <View style={[styles.tableCol, {width:"2%"}]}>
                                        <Text>:</Text>
                                    </View>
                                    <View style={[styles.tableCol, {width:"50%", fontWeight: 700}]}>
                                        <Text>{orderDetail.table_number}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.table}>
                                <View style={[styles.tableRow, styles.tableHeader]}>
                                    <View style={styles.tableCol}><Text>Menu Name</Text></View>
                                    <View style={[styles.tableCol, { textAlign: "right" }]}><Text>Total</Text></View>
                                    <View style={[styles.tableCol, { textAlign: "right" }]}><Text>Price</Text></View>
                                    <View style={[styles.tableCol, { textAlign: "right" }]}><Text>Total Price</Text></View>
                                </View>
                                {orderDetail.cart.map((item: IOrderCart) => (
                                    <View style={[styles.tableRow]}>
                                        <View style={[styles.tableCol, {paddingVertical: 3}]}>
                                            <Text style={{ fontWeight: 700 }}>{item.menuItem?.name}</Text>
                                        </View>
                                        <View style={[styles.tableCol, {paddingVertical: 3}]}>
                                            <Text style={{ textAlign: "right" }}>{item.quantity}</Text>
                                        </View>
                                        <View style={[styles.tableCol, {paddingVertical: 3}]}>
                                            <Text style={{ textAlign: "right" }}>${item.menuItem?.price}</Text>
                                        </View>
                                        <View style={[styles.tableCol, {paddingVertical: 3}]}>
                                            <Text style={{ textAlign: "right" }}>${item.quantity * (item.menuItem?.price as unknown as number)}</Text>
                                        </View>
                                    </View>
                                ))}
                                <View style={[styles.tableRow, styles.tableFooter]}>
                                    <View style={[styles.tableCol, {width: "75%", textAlign: "right"}]}><Text>Grand Total</Text></View>
                                    <View style={[styles.tableCol, {width: "25%"}]}>
                                        <Text style={{ textAlign: "right" }}>${orderDetail.total}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Page>
                    </Document>
                </PDFViewer>
            )
            }
            </>
    );
};

export default OrderInvoice;