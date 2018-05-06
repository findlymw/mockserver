package cn.jts.t.entity;

public class Input extends BaseEntity {
    private long apiId;
    private String paramName;
    private int paramType;
    private String paramSpec;
    private String paramDesc;
    private int paramUnit;
    private String paramValue;
    private int isMust;

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
