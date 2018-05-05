package cn.jts.t.entity.input;

public class AddApiInput {
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

    private InputParam[] headParams;
    private InputParam[] bodyParams;

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
