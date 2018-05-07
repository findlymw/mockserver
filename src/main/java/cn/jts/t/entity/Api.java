package cn.jts.t.entity;


import java.util.List;

public class Api extends BaseEntity {
    private long groupId;
    private String urlMD5;
    private String urlString;
    private int method;
    private String outputData;
    private String dbNameAndTableName;
    private String preAPI;
    private String failData;
    private String versionNo;
    private int isExpired;
    private int requestContentType;
    private int responseContentType;

    private String inputTypeDesc;
    private String outPutDesc;
    private String outPutFailDesc;

    private int inputHeadFlag;
    private int inputBodyFlag;
    private int inputBodyType;


    private String groupIdString;
    private String methodString;
    private String isExpiredString;
    private String requestContentTypeString;
    private String responseContentTypeString;
    private String inputBodyTypeString;
    private String inputHeadFlagString;
    private String inputBodyFlagString;


    public String getGroupIdString() {
        return groupIdString;
    }

    public void setGroupIdString(String groupIdString) {
        this.groupIdString = groupIdString;
    }

    public String getMethodString() {
        return methodString;
    }

    public void setMethodString(String methodString) {
        this.methodString = methodString;
    }

    public String getIsExpiredString() {
        return isExpiredString;
    }

    public void setIsExpiredString(String isExpiredString) {
        this.isExpiredString = isExpiredString;
    }

    public String getRequestContentTypeString() {
        return requestContentTypeString;
    }

    public void setRequestContentTypeString(String requestContentTypeString) {
        this.requestContentTypeString = requestContentTypeString;
    }

    public String getResponseContentTypeString() {
        return responseContentTypeString;
    }

    public void setResponseContentTypeString(String responseContentTypeString) {
        this.responseContentTypeString = responseContentTypeString;
    }

    public String getInputBodyTypeString() {
        return inputBodyTypeString;
    }

    public void setInputBodyTypeString(String inputBodyTypeString) {
        this.inputBodyTypeString = inputBodyTypeString;
    }

    public String getInputHeadFlagString() {
        return inputHeadFlagString;
    }

    public void setInputHeadFlagString(String inputHeadFlagString) {
        this.inputHeadFlagString = inputHeadFlagString;
    }

    public String getInputBodyFlagString() {
        return inputBodyFlagString;
    }

    public void setInputBodyFlagString(String inputBodyFlagString) {
        this.inputBodyFlagString = inputBodyFlagString;
    }

    private String apiName;


    private List<Input> inputs;

    public List<Input> getInputs() {
        return inputs;
    }

    public void setInputs(List<Input> inputs) {
        this.inputs = inputs;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public int getInputHeadFlag() {
        return inputHeadFlag;
    }

    public void setInputHeadFlag(int inputHeadFlag) {
        this.inputHeadFlag = inputHeadFlag;
    }

    public int getInputBodyFlag() {
        return inputBodyFlag;
    }

    public void setInputBodyFlag(int inputBodyFlag) {
        this.inputBodyFlag = inputBodyFlag;
    }

    public int getInputBodyType() {
        return inputBodyType;
    }

    public void setInputBodyType(int inputBodyType) {
        this.inputBodyType = inputBodyType;
    }

    public String getInputTypeDesc() {
        return inputTypeDesc;
    }

    public void setInputTypeDesc(String inputTypeDesc) {
        this.inputTypeDesc = inputTypeDesc;
    }

    public String getOutPutDesc() {
        return outPutDesc;
    }

    public void setOutPutDesc(String outPutDesc) {
        this.outPutDesc = outPutDesc;
    }

    public String getOutPutFailDesc() {
        return outPutFailDesc;
    }

    public void setOutPutFailDesc(String outPutFailDesc) {
        this.outPutFailDesc = outPutFailDesc;
    }

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
