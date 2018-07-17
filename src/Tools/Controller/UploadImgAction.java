package Tools.Controller;

import com.opensymphony.xwork2.ActionSupport;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UploadImgAction extends ActionSupport {
    private File imgfile; //多个文件 ，如果单个文件 ，就定义成  File image ;
    private String imgfileFileName;//多个文件名 ，如果单个文件 ，就定义成  String imageFileName ;
    private String imgfileContentType;//多个文的内容类型,如果 单个文件就定义成 String imageContentType
    private String message = "0";

    private String shellcmd = "";
    private String imgpath = "";

    // 记录Shell执行状况的日志文件的位置(绝对路径)
//    private String executeShellLogFile = "/home/scu/Documents/fapiao/executeShell.log";

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public File getImgfile() {
        return imgfile;
    }

    public void setImgfile(File imgfile) {
        this.imgfile = imgfile;
    }

    public String getImgfileFileName() {
        return imgfileFileName;
    }

    public void setImgfileFileName(String imgfileFileName) {
        this.imgfileFileName = imgfileFileName;
    }

    public String getImgfileContentType() {
        return imgfileContentType;
    }

    public void setImgfileContentType(String imgfileContentType) {
        this.imgfileContentType = imgfileContentType;
    }

    @Override
    public String execute() {
        Properties prop = null;
//        System.out.println(imgfile);
//        System.out.println(imgfileFileName);
//        System.out.println(imgfileContentType);

        try {
            // read some path config
            prop = readOCRConfig();
            shellcmd = prop.getProperty("shellcmd");
            imgpath = prop.getProperty("imgpath");

            if (imgfile != null && (imgfileContentType.endsWith("png") || imgfileContentType.endsWith("jpeg"))) {

                //得到输入流，通过struts已经得到名为upload的控件的值
                InputStream is = new FileInputStream(imgfile);

                //得到输出流
                OutputStream os = new FileOutputStream(imgpath + "test." + imgfileFileName.substring(imgfileFileName.length() - 3));

                //分配接受缓冲区
                byte buffer[] = new byte[1024];
                int count = 0;
                while ((count = is.read(buffer)) > 0) {
                    os.write(buffer, 0, count);
                }

                is.close();
                os.flush();

                String content = executeShell();
                System.out.println(content);
                Pattern p = Pattern.compile("\\{");
                Matcher m = p.matcher(content);
                int index = 0;
                while(m.find()){
                    index = m.start();
                    break;
                }
                System.out.println(content.substring(index));
                message = content.substring(index);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
            message = e.getMessage();
            return ERROR;
        }
        message = "0";
        return ERROR;
    }

    public Properties readOCRConfig() throws Exception {
        Properties prop = new Properties();
        InputStream in = new BufferedInputStream(new FileInputStream(System.getProperty("user.dir") + "/ocrConfig.txt"));
        prop.load(in);
        return prop;
    }

    //Java执行shell脚本
    public String executeShell() throws IOException {
        int success = 0;
        StringBuffer stringBuffer = new StringBuffer();
        BufferedReader bufferedReader = null;
        // 格式化日期时间，记录日志时使用
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS ");

        Process process = null;
        String[] cmd = {"/bin/sh", "-c", shellcmd + " " + imgpath + "test." + imgfileFileName.substring(imgfileFileName.length() - 3)};

        try {
            process = Runtime.getRuntime().exec(cmd);
            if (process != null) {
                // bufferedReader用于读取Shell的输出内容
                bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()), 1024);
                process.waitFor();
            } else {

            }

            String line = "";
            // 读取Shell的输出内容，并添加到stringBuffer中
            while (bufferedReader != null && (line = bufferedReader.readLine()) != null) {
                stringBuffer.append(line);
            }
        } catch (Exception ioe) {
            stringBuffer.append("执行Shell命令时发生异常：\r\n").append(ioe.getMessage())
                    .append("\r\n");
        }
        return stringBuffer.toString();
    }
}

