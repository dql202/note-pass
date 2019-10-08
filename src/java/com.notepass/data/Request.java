package data;

public class Request {
    private Integer noteID;
    private Integer ownerID;
    private Integer requesterID;

    public Request(Integer noteID, Integer ownerID, Integer requesterID) {
        this.noteID = noteID;
        this.ownerID = ownerID;
        this.requesterID = requesterID;
    }

    /** Methods to retrieve values in private fields of Request object*/
    public Integer getNodeID() {
        return this.noteID;
    }

    public Integer getOwnerID() {
        return this.ownerID;
    }

    public Integer getRequesterID() {
        return this.requesterID;
    }
}