package cn.jts.t.entity;

import cn.jts.t.service.DicService;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class DicCache {
    private List<ColumType> columTypes;
    private List<ContentType> contentTypes;
    private List<InputType>  inputTypes;
    private List<Method> methods;
    private List<Unit> units;


    public DicCache(DicService dicService){
        try{
            columTypes = dicService.columTypes();
            contentTypes = dicService.contentTypes();
            inputTypes = dicService.inputTypes();
            methods = dicService.methods();
            units = dicService.units();
        }catch(Exception e){
            throw new RuntimeException("Exception occured in creating singleton instance");
        }
    }

    public List<ColumType> getColumTypes() {
        return columTypes;
    }

    public void setColumTypes(List<ColumType> columTypes) {
        this.columTypes = columTypes;
    }

    public List<ContentType> getContentTypes() {
        return contentTypes;
    }

    public void setContentTypes(List<ContentType> contentTypes) {
        this.contentTypes = contentTypes;
    }

    public List<InputType> getInputTypes() {
        return inputTypes;
    }

    public void setInputTypes(List<InputType> inputTypes) {
        this.inputTypes = inputTypes;
    }

    public List<Method> getMethods() {
        return methods;
    }

    public void setMethods(List<Method> methods) {
        this.methods = methods;
    }

    public List<Unit> getUnits() {
        return units;
    }

    public void setUnits(List<Unit> units) {
        this.units = units;
    }
}
