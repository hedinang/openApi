package com.example.openapi.utils;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class AESUtils {
    private static final String encoding = "UTF-8";
    private static final String PKCS_PADDING = "AES/ECB/PKCS5PADDING";


    public static String encrypt(String content, String key, boolean isURLEncoder)
            throws Exception {
        byte[] byteContent = content.getBytes(encoding);
        byte[] enCodeFormat = key.getBytes(encoding);
        SecretKeySpec secretKeySpec = new SecretKeySpec(enCodeFormat, "AES");
        Cipher cipher = Cipher.getInstance(PKCS_PADDING);
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = cipher.doFinal(byteContent);
        String base64 = new Base64().encodeToString(encryptedBytes);
        if(isURLEncoder) {
            return URLEncoder.encode(base64, encoding);
        }else{
            return base64;
        }
    }


    public static String decrypt(String content, String key, boolean isURLEncoder)
            throws Exception {
        if(isURLEncoder) {
            content = URLDecoder.decode(content, encoding);
        }
        byte[] encryptedBytes = Base64.decodeBase64(content);
        byte[] enCodeFormat = key.getBytes(encoding);
        SecretKeySpec secretKey = new SecretKeySpec(enCodeFormat, "AES");
        Cipher cipher = Cipher.getInstance(PKCS_PADDING);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] result = cipher.doFinal(encryptedBytes);
        return new String(result, encoding);
    }

    public static void main(String[] args) throws Exception {
        String content = "{\"data\":null,\"msg\":\"You do not have permission to access\",\"code\":10024}";
        System.out.println("加密前：" + content);
        String key = "19e1de052be1063d530d2d4016bb4532";
        System.out.println("加密密钥和解密密钥：" + key);
        String encrypt = encrypt(content, key, false);
        System.out.println("加密后：" + encrypt);
        String decrypt = decrypt(encrypt, key, false);
        System.out.println("解密后：" + decrypt);

        String ass ="unD3aBxRU4WdTCxKRkeqYs5WqWklMOPwZSDvXBsVwXFrw/g8ESyPdngjPvRhpxnCe5loPGg471dlbJjAXwhFJZ/eAa8rXW99GdK4dxcxMMI=";
        boolean isRun = ass.equalsIgnoreCase(encrypt);
        System.out.println("isRun：" + isRun);

    }


}
