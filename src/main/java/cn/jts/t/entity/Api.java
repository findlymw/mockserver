package cn.jts.t.entity;


public class Api extends BaseEntity {
    private long groupId;
    private String urlMD5;
    private String urlString;
    private int method;
    private int inputType;
    private String outputData;
    private String dbNameAndTableName;
    private String preAPI;
    private String failData;
    private String versionNo;
    private int isExpired;
    private int requestContentType;
    private int responseContentType;

    public long getGroupId() {
        return groupId;
    }

    public void setGroupId(long groupId) {
        this.groupId = groupId;
    }

    public String getUrlMD5() {
        return urlMD5;
    }

    public void setUrlMD5(String urlMD5) {
        this.urlMD5 = urlMD5;
    }

    public String getUrlString() {
        return urlString;
    }

    public void setUrlString(String urlString) {
        this.urlString = urlString;
    }

    public int getMethod() {
        return method;
    }

    public void setMethod(int method) {
        this.method = method;
    }

    public int getInputType() {
        return inputType;
    }

    public void setInputType(int inputType) {
        this.inputType = inputType;
    }

    public String getOutputData() {
        return outputData;
    }

    public void setOutputData(String outputData) {
        this.outputData = outputData;
    }

    public String getDbNameAndTableName() {
        return dbNameAndTableName;
    }

    public void setDbNameAndTableName(String dbNameAndTableName) {
        this.dbNameAndTableName = dbNameAndTableName;
    }

    public String getPreAPI() {
        return preAPI;
    }

    public void setPreAPI(String preAPI) {
        this.preAPI = preAPI;
    }

    public String getFailData() {
        return failData;
    }

    public void setFailData(String failData) {
        this.failData = failData;
    }

    public String getVersionNo() {
        return versionNo;
    }

    public void setVersionNo(String versionNo) {
        this.versionNo = versionNo;
    }

    public int getIsExpired() {
        return isExpired;
    }

    public void setIsExpired(int isExpired) {
        this.isExpired = isExpired;
    }

    public int getRequestContentType() {
        return requestContentType;
    }

    public void setRequestContentType(int requestContentType) {
        this.requestContentType = requestContentType;
    }

    public int getResponseContentType() {
        return responseContentType;
    }

    public void setResponseContentType(int responseContentType) {
        this.responseContentType = responseContentType;
    }
}
