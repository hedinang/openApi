package com.example.openapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Params {
    String paramName;
    String paramType;
    String dataType;
    String defaultValue;
    boolean mandatory;
    String note;
    boolean autoGenerate;
}
