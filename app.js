

var sheet = SpreadsheetApp.getActiveSheet();

var address = '72.143.118.130';
var rootPwd = 'qwer1234';
var user = 'root';
var userPwd = 'qwer1234';
var db = 'test_gs';

var root = 'root';
var instanceUrl = 'jdbc:mysql://' + address;
var dbUrl = instanceUrl + '\\' + db;

function createDataBase(){
  var conn = Jdbc.getConnection(instanceUrl, root, rootPwd);
  conn.createStatement().execute('CREATE DATABASE ' + db);
}
