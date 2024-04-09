import axios from "axios";
const baseApiClient = axios.create({

  baseURL: `http://localhost:8260`,
  withCredentials: false,
  headers: {
    Accept: `application/json`,
    "Content-Type": `application/json`,
  },
});

export default{
    LoginValidation(body){
        return baseApiClient.put('/loginValidation',body);
    },
    loginHistory(user){
      console.log(user + "**")
      const hdr ={
          headers:{"USER": user}
      }
      return baseApiClient.put('/loginhistoryInsert',"",hdr);
    },
    logoutHistory(){
      
      return baseApiClient.put('/logouthistoryInsert',"");
    },
    getUserRole(){
      return baseApiClient.put('/userRoleFetching',"");
    },
    getStock(){
      return baseApiClient.get('/viewMedicine',"");
    },
    getBrandStock(){
      return baseApiClient.get('/viewBrand',"")
    },
    addUser(body){
      return baseApiClient.put('/addNewUser',body);
    },
    getLogHistory(){
      return baseApiClient.get('/viewLogHistory');
    },
    AddNewMedicineBrand(body){
      return baseApiClient.put('/insertMedicineBrand',body);
    },
    AddnewMedicine(body){
      return baseApiClient.put('/insertMedicineName',body);
    },
    GetBrandMedicine(brandname){
      const hdr ={
        headers:{"MEDNAME": brandname}
      }
      return baseApiClient.put('/getMedicineByBrand',"",hdr);
    },
    AddPurchasedItem(body){
      return baseApiClient.put('/MedicineInput',body);
    },
    DonePurchasedItems(body){
      return baseApiClient.put('/MedicineOutput',body);
    },
    TodaySalesReport(user){
      console.log(user,"user")
      const hdr ={
        headers:{"USER": user}
      }
   
      return baseApiClient.put('/todaysales',"",hdr);
    },
    CompareSalesReport(body){
      return baseApiClient.put('/comparesales',body);
    },
    StockPricesDetails(){
      return baseApiClient.put('/stockprices',"");
    },
    SalesReportDetails(body){
      console.log(body);
      return baseApiClient.put('/salesreport',body);
    },
    BilldetailsInsert(body){
      return baseApiClient.put('/BillDetails',body);
    },
    TodaySalesReportManager(){
      return baseApiClient.put('/todaysalesmanager',"");
    },
    FetchQuantity(medname){
      const hdr = {
        headers: {
          "MEDNAME": medname
        }
      }
      return baseApiClient.put('/fetchQuantity', "", hdr);
    },
    DownloadBill(body){
      return baseApiClient.put('/downloadBill',body);
    },
    DownloadPdf(body,billno){
      console.log(billno,"bille");
      const hdr ={
        headers:{"BILLNO": billno}
      }
      return baseApiClient.put('/downloadPdf',body,hdr);
    },
    MonthSales(){
      return baseApiClient.put('/monthsales',"");
    },
    BillerSales(){
      return baseApiClient.put('/billersales',"");
    }
    
}