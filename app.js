
var address = '72.143.118.130';
var rootPwd = 'qwer1234';
var user = 'root';
var userPwd = 'qwer1234';
var db = 'test_gs';

var root = 'root';
var instanceUrl = 'jdbc:mysql://' + address;
var dbUrl = instanceUrl + '/' + db;


var SQLstatement;
var conn;
var queryResult;


function getDatabaseConn(){
  conn = Jdbc.getConnection(dbUrl, root, rootPwd);
  return conn;
} 
  

function pullDataFromDatabase(dbConn, tableName){
  SQLstatement = dbConn.createStatement();
  queryResult = SQLstatement.executeQuery("SELECT * FROM " + tableName);
  return queryResult;
}

function adaptDataIntoSheet(data, fieldsPerRecord){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // choose a range in sheet, usually starts from A2, because A1 and the row are used to show titles(field names)
  var cell = ss.getRange('A2');
  
  var row = 0;
  while(data.next()) {
    for(var i = 0; i < fieldsPerRecord; i++) {    
       cell.offset(row, i).setValue(data.getString(i + 1));
    }
    row++;
  }
}

function getDataFromMyDB(){
  adaptDataIntoSheet(pullDataFromDatabase(getDatabaseConn(), "user"), 2);
  closeConn();
}

function closeConn(){
   queryResult.close();
   SQLstatement.close();
   conn.close();
}
