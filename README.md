状态面板
----
## 配置示例
<details></summary>配置示例</summary>

```jsonc
[
  {
    "id": 1,
    "type": "TEXT",
    "title": "只是文本展示",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "icon-zhujizu",
    "params": {}
  },
  {
    "id": 2,
    "type": "PING",
    "title": "PING localhost",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "icon-zhujizu",
    "params": {
      "host": "localhost"
    }
  },
  {
    "id": 3,
    "type": "HTTP-STATUS",
    "title": "百度是否可访问",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "icon-zhujijiankong",
    "params": {
      "url": "https://www.baidu.com"
    }
  },
  {
    "id": 4,
    "type": "HTTP-RAW",
    "title": "我的IP地址",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {
      "url": "http://myip.ipip.net",
      "regex": "[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}"
    }
  },
  {
    "id": 5,
    "type": "HTTP-JSON",
    "title": "项目构建人",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {
      "url": "https://api.yesdididi.com/base-api/actuator/info",
      "path": "$.git.build.user.name"
    }
  },
  {
    "id": 6,
    "type": "TEXT",
    "title": "只是文本展示",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {}
  },
  {
    "id": 7,
    "type": "SSL-CERT",
    "title": "dongfg.com证书过期时间",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {
      "host": "dongfg.com"
    }
  },
  {
    "id": 8,
    "type": "SSL-CERT",
    "title": "证书已过期",
    "rowSpan": 1,
    "colSpan": 2,
    "icon": "",
    "params": {
      "host": "expired.badssl.com"
    }
  },
  {
    "id": 9,
    "type": "TEXT",
    "title": "只是文本展示",
    "rowSpan": 2,
    "colSpan": 1,
    "icon": "",
    "params": {}
  },
  {
    "id": 10,
    "type": "PING",
    "title": "PING 127.0.0.1",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {
      "host": "127.0.0.1"
    }
  },
  {
    "id": 11,
    "type": "TEXT",
    "title": "只是文本展示",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {}
  },
  {
    "id": 12,
    "type": "PING",
    "title": "PING nas",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "icon-luyou",
    "params": {
      "host": "kuaiche-nas.myds.me"
    }
  },
  {
    "id": 13,
    "type": "TEXT",
    "title": "只是文本展示",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "icon-wangluo",
    "params": {}
  },
  {
    "id": 14,
    "type": "TEXT",
    "title": "只是文本展示",
    "rowSpan": 1,
    "colSpan": 1,
    "icon": "",
    "params": {}
  }
]
```

</details>

## 配置说明
| 配置项   | 类型   | 说明                      |
| -------- | ------ | ------------------------- |
| id       | number | 唯一值                    |
| type     | 枚举   | 类型枚举, 见下方说明      |
| title    | string | 标题                      |
| icon     | string | 可选, 图标, 使用 iconfont |
| params   | object | 配合 type 使用,见下方说明 |
| children | -      | type=GROUP时，支持        |
| rowSpan  | number | 行跨度, 默认1             |
| colSpan  | number | 列跨度, 默认1             |

### TEXT
> 用于文本展示
```jsonc
{
    "type": "TEXT",
    "params": {
        "text": "" // 文本内容
    }
}
```

### ~~PING~~
> 展示延迟
```jsonc
{
    "type": "PING",
    "params": {
        "host": "" // 主机地址
    }
}
```

#### HTTP-STATUS
> 根据返回的 http 状态码判断地址是否可用
> 状态码 [200, 400) 为成功，其他为失败
```jsonc
{
    "type": "HTTP-STATUS",
    "params": {
        "url": "" // 请求网址
    }
}
```
#### HTTP-RAW
> 展示原始返回，支持通过 regex 解析返回
```jsonc
{
    "type": "HTTP-RAW",
    "params": {
        "url": "", // 请求网址
        "regex": "" // 可选，通过regex解析返回
    }
}
```
#### HTTP-JSON
> 展示JSON返回，支持通过 jsonpath 解析返回
> - 参考 https://github.com/JSONPath-Plus/JSONPath
> - 参考 https://jsonpath-plus.github.io/JSONPath/demo/
```jsonc
{
    "type": "HTTP-JSON",
    "params": {
        "url": "", // 请求网址,
        "path": "" // 通过jsonpath解析返回
    }
}
```

#### SSL-CERT
> 展示https证书是否过期
```jsonc
{
    "type": "SSL-CERT",
    "params": {
        "host": "", // 主机地址
        "port": 443 // https 端口, 默认 443
    }
}
```