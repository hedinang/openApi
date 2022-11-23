package com.example.openapi.utils;

import org.apache.commons.codec.binary.Base64;

import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

public class Base64Util {

    public static String encode(String content) {
        byte[] result = Base64.encodeBase64(content.getBytes(StandardCharsets.UTF_8));
        return new String(result, StandardCharsets.UTF_8);
    }

    public static String decode(String content) {
        byte[] decode = Base64.decodeBase64(content);
        return new String(decode, StandardCharsets.UTF_8);
    }

    public static boolean isBase64(String str) {
        String base64Pattern = "^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$";
        return Pattern.matches(base64Pattern, str);
    }
}