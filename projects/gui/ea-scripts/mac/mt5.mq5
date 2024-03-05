//#include <stdlib.mqh>
#include <Trade\Trade.mqh>
#include <Trade\SymbolInfo.mqh>
#include <Trade\PositionInfo.mqh>

struct RawHistory
  {
   ulong             positionID;
   string            symbol;
   string            volume;
   string            dealType;
   double            entryPrice;
   double            closePrice;
   double            profit;
   datetime          entryTime;
   datetime          exitTime;
   double            sl;
   double            tp;
  };

struct RawOrder
  {
   ulong             positionID;
   string            symbol;
   string            volume;
   string            dealType;
   double            entryPrice;
   datetime          orderPlacedTime;
   double            sl;
   double            tp;
  };


RawOrder totalOrders[];
RawHistory totalHistories[];

int OnInit()
  {
   Print("FOREXPLORE EA STARTING ...");

    GetHistory();
    PrintAllOrders();

    sendDetailsToServer();

   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   Print("FOREXPLORE EA stopping ...");
  }

void OnTrade()
  {
   GetHistory();
  }


void GetHistory()
  {
   ulong lastPositionID = -1;

   if(HistorySelect(0, TimeCurrent()))
     {
      int totalHistoryDeals = HistoryDealsTotal();

      for(int i = 0; i < totalHistoryDeals; i++)
        {
         ulong dealTicket = HistoryDealGetTicket(i);
         ulong positionID = HistoryDealGetInteger(dealTicket, DEAL_POSITION_ID);

         if(dealTicket > 0)
           {

            // if(positionID != lastPositionID) {

            string symbol = HistoryDealGetString(dealTicket, DEAL_SYMBOL);
            double volume = HistoryDealGetDouble(dealTicket, DEAL_VOLUME);

            int dealType = HistoryDealGetInteger(dealTicket, DEAL_TYPE);
            string dealTypeStr = (dealType == DEAL_TYPE_BUY) ? "Buy" : (dealType == DEAL_TYPE_SELL) ? "Sell": "Other";
            datetime entryTime = (datetime)HistoryDealGetInteger(dealTicket, DEAL_TIME);

            double priceEntry = HistoryDealGetDouble(dealTicket, DEAL_PRICE);
            double profit = HistoryDealGetDouble(dealTicket, DEAL_PROFIT);

            double sl = HistoryDealGetDouble(dealTicket, DEAL_SL);
            double tp = HistoryDealGetDouble(dealTicket, DEAL_TP);

            // GetSLTPFromPosition(dealTicket, sl, tp);



            ArrayResize(totalHistories, ArraySize(totalHistories) + 1);
            totalHistories[ArraySize(totalHistories) - 1].positionID = positionID;
            totalHistories[ArraySize(totalHistories) - 1].symbol = symbol;
            totalHistories[ArraySize(totalHistories) - 1].volume = volume;
            totalHistories[ArraySize(totalHistories) - 1].dealType = dealTypeStr;
            totalHistories[ArraySize(totalHistories) - 1].entryPrice = priceEntry;
            totalHistories[ArraySize(totalHistories) - 1].entryTime = entryTime;


            // default data
            totalHistories[ArraySize(totalHistories) - 1].profit = profit;
            totalHistories[ArraySize(totalHistories) - 1].closePrice = 0.0;
            totalHistories[ArraySize(totalHistories) - 1].exitTime = entryTime;

            totalHistories[ArraySize(totalHistories) - 1].sl = sl;
            totalHistories[ArraySize(totalHistories) - 1].tp = tp;


            if(totalHistoryDeals != i + 1)
              {
               ulong nextDealTicket = HistoryDealGetTicket(i + 1);
               ulong nextPositionID = HistoryDealGetInteger(nextDealTicket, DEAL_POSITION_ID);

               if(positionID == nextPositionID)
                 {
                  double closePrice = HistoryDealGetDouble(nextDealTicket, DEAL_PRICE);
                  double profit = HistoryDealGetDouble(nextDealTicket, DEAL_PROFIT);
                  datetime exitTime = (datetime)HistoryDealGetInteger(nextDealTicket, DEAL_TIME);

                  totalHistories[ArraySize(totalHistories) - 1].closePrice = closePrice;
                  totalHistories[ArraySize(totalHistories) - 1].profit = profit;
                  totalHistories[ArraySize(totalHistories) - 1].exitTime = exitTime;

                  i++;
                 }
              }

            // }


           }
         else
           {
            Print("Failed to get ticket for history deal at index ", i);
           }
        }
    }
  }

void PrintAllOrders() 
  {
    int totalOrdersLength = OrdersTotal();

    for(int i = 0; i < totalOrdersLength; i++) {
      if(OrderGetTicket(i)>0) {
        double open_price    =OrderGetDouble(ORDER_PRICE_OPEN);
        double tp = OrderGetDouble(ORDER_TP);
        double sl    =OrderGetDouble(ORDER_SL);

        
        datetime time_setup    =(datetime)OrderGetInteger(ORDER_TIME_SETUP);
        string symbol        =OrderGetString(ORDER_SYMBOL);
        long positionID    =OrderGetInteger(ORDER_POSITION_ID);
        double initial_volume=OrderGetDouble(ORDER_VOLUME_INITIAL);
        string type          =EnumToString(ENUM_ORDER_TYPE(OrderGetInteger(ORDER_TYPE)));


        ArrayResize(totalOrders, ArraySize(totalOrders) + 1);
        totalOrders[ArraySize(totalOrders) - 1].positionID = positionID;
        totalOrders[ArraySize(totalOrders) - 1].symbol = symbol;
        totalOrders[ArraySize(totalOrders) - 1].volume = initial_volume;
        totalOrders[ArraySize(totalOrders) - 1].dealType = type;
        totalOrders[ArraySize(totalOrders) - 1].entryPrice = open_price;
        totalOrders[ArraySize(totalOrders) - 1].orderPlacedTime = time_setup;
        totalOrders[ArraySize(totalOrders) - 1].sl = sl;
        totalOrders[ArraySize(totalOrders) - 1].tp = tp;
        
      } else {
        // If the order cannot be selected, print an error message
        Print("Failed to select order #", i, ", Error: ", GetLastError());
      }
    }
  }

void sendDetailsToServer()
  {
   string dealsObjString = "[";
   for(int i = 0; i < ArraySize(totalHistories); i++)
     {

      string entryTimeStr = TimeToString(totalHistories[i].entryTime, TIME_DATE | TIME_MINUTES);
      string exitTimeStr = TimeToString(totalHistories[i].exitTime, TIME_DATE | TIME_MINUTES);
      dealsObjString += StringFormat("{\"positionID\":%I64u,\"symbol\":\"%s\",\"volume\":\"%s\",\"dealType\":\"%s\",\"entryPrice\":%.5f,\"closePrice\":%.5f,\"profit\":%.2f,\"entryTime\":\"%s\",\"exitTime\":\"%s\",\"tp\":%.5f,\"sl\":%.5f}",
                                 totalHistories[i].positionID, totalHistories[i].symbol, totalHistories[i].volume, totalHistories[i].dealType,
                                 totalHistories[i].entryPrice, totalHistories[i].closePrice, totalHistories[i].profit, entryTimeStr, exitTimeStr, totalHistories[i].tp, totalHistories[i].sl);

      if(i < ArraySize(totalHistories) - 1)
         dealsObjString += ",";
     }
   dealsObjString += "]";

  string ordersObjString = "[";
   for(int i = 0; i < ArraySize(totalOrders); i++)
     {

      string orderPlacedTimeStr = TimeToString(totalOrders[i].orderPlacedTime, TIME_DATE | TIME_MINUTES);
      ordersObjString += StringFormat("{\"positionID\":%I64u,\"symbol\":\"%s\",\"volume\":\"%s\",\"dealType\":\"%s\",\"entryPrice\":%.5f,\"entryTime\":\"%s\",\"tp\":%.5f,\"sl\":%.5f}",
                                 totalOrders[i].positionID, totalOrders[i].symbol, totalOrders[i].volume, totalOrders[i].dealType,
                                 totalOrders[i].entryPrice, orderPlacedTimeStr, totalOrders[i].tp, totalOrders[i].sl);

      if(i < ArraySize(totalOrders) - 1)
         ordersObjString += ",";
     }
   ordersObjString += "]";

  string objString = "{\"orders\":" + ordersObjString + ",\"deals\":" + dealsObjString + "}";

   const string api_url = "http://127.0.0.1:4123/listener";
   char result[];
   string headers = "Content-Type: application/json\r\n";
   string result_headers;
   char post_data[];


   StringToCharArray(objString, post_data);

   int res = WebRequest(
      "POST",              // HTTP method
      api_url,             // URL
      headers,             // Headers
      5000,                // Timeout
      post_data,           // POST data
      result,              // Server response
      result_headers       // Response headers
    );

   if(res == -1)
     {
      // Handle error, you can get detailed error info using GetLastError()
      int error_code = GetLastError();
      Print("Error in WebRequest. Code: ", error_code);
     }
   else
     {
      // Success, process 'response' as needed
      string responseString = CharArrayToString(result);
      Print("Response from server: ", responseString);
     }
  }

string JsonEscapeString(string text)
  {
   text = StringReplace(text, "\"", "\\\"");
   text = StringReplace(text, "\\", "\\\\");
   text = StringReplace(text, "/", "\\/");
   text = StringReplace(text, "\b", "\\b");
   text = StringReplace(text, "\f", "\\f");
   text = StringReplace(text, "\n", "\\n");
   text = StringReplace(text, "\r", "\\r");
   text = StringReplace(text, "\t", "\\t");
   return text;
  }