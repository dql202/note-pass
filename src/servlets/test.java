import DBManager;

public class test {
    public static void main(String[] args) {
        DBManager db = new DBManager();
        Connection conn = db.getConnection();
    }
}