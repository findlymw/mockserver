package cn.jts.t.filter;

import cn.jts.t.utils.MD5;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@WebFilter(urlPatterns = "/api",filterName = "apiFilter")
//拦截的url为/api，过滤器名字为 apiFilter
public class APIFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest= (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        StringBuffer url = httpServletRequest.getRequestURL();

        if(null != url && !"".equals(url) && url.length()>4 ){
            int index = url.toString().indexOf("/api/");
            if( index > 0){
                String apiUrl = url.substring(index+4);
                String md5 = MD5.parseStrToMd5L32(apiUrl);
                RequestDispatcher dispatcher=httpServletRequest.getRequestDispatcher("/gateway/"+md5);
                dispatcher.forward(httpServletRequest,httpServletResponse);
                return;
            }
        }

        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }

    @Override
    public void destroy() {

    }
}
