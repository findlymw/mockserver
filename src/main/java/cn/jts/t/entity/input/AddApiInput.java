package cn.jts.t.entity.input;

public class AddApiInput {
    private long id;
    private long apiGroup;
    private String restful;
    private int method;
    private int reqContentType;
    private int respContentType;
    private int headersFlag;
    private int bodyFlag;
    private String bodyRaw;
    private int inputTypeSelect;
    private String output;
    private String outputFail;

    private String inputParamDesc;
    private String outPutDesc;
    private String outPutFailDesc;

    private InputParam[] headParams;
    private InputParam[] bodyParams;


    private String apiName;
    private String preApi;
    private int isExpired;
    private String version;
    private String dbNameTable;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getPreApi() {
        return preApi;
    }

    public void setPreApi(String preApi) {
        this.preApi = preApi;
    }

    public int getIsExpired() {
        return isExpired;
    }

    public void setIsExpired(int isExpired) {
        this.isExpired = isExpired;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDbNameTable() {
        return dbNameTable;
    }

    public void setDbNameTable(String dbNameTable) {
        this.dbNameTable = dbNameTable;
    }

    public String getInputParamDesc() {
        return inputParamDesc;
    }

    public void setInputParamDesc(String inputParamDesc) {
        this.inputParamDesc = inputParamDesc;
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

    public String getRestful() {
        return restful;
    }

    public void setRestful(String restful) {
        this.restful = restful;
    }

    public int getMethod() {
        return method;
    }

    public void setMethod(int method) {
        this.method = method;
    }

    public int getReqContentType() {
        return reqContentType;
    }

    public void setReqContentType(int reqContentType) {
        this.reqContentType = reqContentType;
    }

    public int getRespContentType() {
        return respContentType;
    }

    public void setRespContentType(int respContentType) {
        this.respContentType = respContentType;
    }

    public int getHeadersFlag() {
        return headersFlag;
    }

    public void setHeadersFlag(int headersFlag) {
        this.headersFlag = headersFlag;
    }

    public int getBodyFlag() {
        return bodyFlag;
    }

    public void setBodyFlag(int bodyFlag) {
        this.bodyFlag = bodyFlag;
    }

    public String getBodyRaw() {
        return bodyRaw;
    }

    public void setBodyRaw(String bodyRaw) {
        this.bodyRaw = bodyRaw;
    }

    public int getInputTypeSelect() {
        return inputTypeSelect;
    }

    public void setInputTypeSelect(int inputTypeSelect) {
        this.inputTypeSelect = inputTypeSelect;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getOutputFail() {
        return outputFail;
    }

    public void setOutputFail(String outputFail) {
        this.outputFail = outputFail;
    }

    public InputParam[] getHeadParams() {
        return headParams;
    }

    public void setHeadParams(InputParam[] headParams) {
        this.headParams = headParams;
    }

    public InputParam[] getBodyParams() {
        return bodyParams;
    }

    public void setBodyParams(InputParam[] bodyParams) {
        this.bodyParams = bodyParams;
    }

    public long getApiGroup() {
        return apiGroup;
    }

    public void setApiGroup(long apiGroup) {
        this.apiGroup = apiGroup;
    }
}
