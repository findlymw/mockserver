package cn.jts.t.entity;

public class Input extends BaseEntity {
    private long apiId;
    private int hbType;
    private String paramName;
    private int paramType;
    private String paramSpec;
    private String paramDesc;
    private int paramUnit;
    private String paramValue;
    private int isMust;

    private String hbTypeString;
    private String paramTypeString;
    private String paramUnitString;
    private String isMustString;


    public String getHbTypeString() {
        return hbTypeString;
    }

    public void setHbTypeString(String hbTypeString) {
        this.hbTypeString = hbTypeString;
    }

    public String getParamTypeString() {
        return paramTypeString;
    }

    public void setParamTypeString(String paramTypeString) {
        this.paramTypeString = paramTypeString;
    }

    public String getParamUnitString() {
        return paramUnitString;
    }

    public void setParamUnitString(String paramUnitString) {
        this.paramUnitString = paramUnitString;
    }

    public String getIsMustString() {
        return isMustString;
    }

    public void setIsMustString(String isMustString) {
        this.isMustString = isMustString;
    }

    public int getHbType() {
        return hbType;
    }

    public void setHbType(int hbType) {
        this.hbType = hbType;
    }

    public long getApiId() {
        return apiId;
    }

    public void setApiId(long apiId) {
        this.apiId = apiId;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public int getParamType() {
        return paramType;
    }

    public void setParamType(int paramType) {
        this.paramType = paramType;
    }

    public String getParamSpec() {
        return paramSpec;
    }

    public void setParamSpec(String paramSpec) {
        this.paramSpec = paramSpec;
    }

    public String getParamDesc() {
        return paramDesc;
    }

    public void setParamDesc(String paramDesc) {
        this.paramDesc = paramDesc;
    }

    public int getParamUnit() {
        return paramUnit;
    }

    public void setParamUnit(int paramUnit) {
        this.paramUnit = paramUnit;
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
    }

    public int getIsMust() {
        return isMust;
    }

    public void setIsMust(int isMust) {
        this.isMust = isMust;
    }
}
