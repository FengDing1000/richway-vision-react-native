module.exports = {
    root: true,
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "plugins": [
        "react",
        "react-native"
    ],
    "globals": {
        "__DEV__": true,
        "fetch": true
    },
    "parser": "babel-eslint",
    "rules": {
        // //缩进风格
        // "indent": [2, 4],
        // // allow async-await
        // 'generator-star-spacing': 'off',
        // // allow debugger during development
        // 'no-debugger': 'off',
        // // 取消换行符\n或\r\n的验证
        // "linebreak-style": "off",
        // // 使用分号
        // "semi": ["error", "always"],
        // // 箭头函数的参数可以不使用圆括号
        // "arrow-parens": ["error", "as-needed"],
        // // 不允许末尾逗号
        // "comma-dangle": ["error", "never"],
        // // 关闭函数中return的检测
        // "consistent-return": 0,
        // // 花括号内的换行符不一定要格式一致
        // "object-curly-newline": ["error", {"consistent": true}],
        // // 取消对require的验证，使得可以使用require来加载图片的相对路径
        // "global-require": "off",
        // // 不验证函数括号内的换行
        // "function-paren-newline": "off",
        // // 取消自动解析路径，以此开启alias的别名路径设置
        // "import/no-unresolved": "off",
        // // 允许对函数参数进行再赋值
        // "no-param-reassign": "off",
        // // 取消对文件扩展名的验证
        // "import/extensions": "off",
        // // 取消行的最大长度的验证，使SVG不用重新调整格式
        // "max-len": "off",
        // //允许标识符中有下划线，从而支持vue中插件的使用
        // "no-underscore-dangle": "off",
        // // 启用console控制台
        // "no-console": "off",
        // // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
        // "no-unused-expressions": "off",
        // // 取消变量声明覆盖的验证
        // "no-shadow": "off",
        // // 取消对元素特性只能使用中划线或小驼峰形式的验证
        // "vue/attribute-hyphenation": 0,
        // // 取消元素有多个特性时，每个特性独占一行的验证
        // "vue/max-attributes-per-line": 0,
        // //引号类型 `` "" ''
        // "quotes": ["error", "backtick"],
        // //对象字面量中的属性名是否强制双引号
        // "quote-props": ["error", "as-needed"],
        // //parseInt必须指定第二个参数
        // "radix": ["error", "always"],
        // //要求调用 isNaN()检查 NaN
        // "use-isnan": "error",
        // //强制使用有效的 JSDoc 注释
        // "valid-jsdoc": "error",
        // //强制 typeof 表达式与有效的字符串进行比较
        // "valid-typeof": "error",
        // //要求使用一致的 return 语句
        // "consistent-return": "off",
        // //要求遵循大括号约定
        // "curly": "error",
        // //要求 Switch 语句中有 Default 分支,此规则的目的是在 switch 语句中强制声明 default 分支。或者也可以在最后一个 case 分支下，使用 // no default 来表明此处不需要 default 分支。注释可以任何形式出现，比如 // No Default
        // "default-case": "error",
        // //禁用特定的全局变量
        // "no-restricted-globals": ["error", "event"],
        // //使用禁止一元型态操作符++状语从句
        // "no-plusplus": "off",
        // //禁止未声明的变量
        // "no-undef": "error",
        // //遍历对象语法
        // "no-restricted-syntax": "off",
        // //要求使用骆驼拼写法
        // "camelcase": ["error"],
        // // 解构赋值
        // "destructuring": true,
        // "max-len": ["error", 120],
        // "react/forbid-prop-types": [0, { "forbid": ["any", "array", "object"] }],
        // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
        "arrow-body-style": [
            2,
            "as-needed"
        ],
        "arrow-parens": [
            "error",
            "always"
        ],
        "allow-single-line": true,
        "block-spacing": 2,
        "class-methods-use-this": 0,
        "comma-dangle": [
            2,
            "always-multiline"
        ],
        "import/imports-first": 0,
        "import/newline-after-import": 0,
        "import/no-dynamic-require": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-named-as-default": 0,
        "import/no-unresolved": 0,
        "import/prefer-default-export": 0,
        "import/no-webpack-loader-syntax": 0,
        "indent": [2, 4],
        "lines-between-class-members": 0,
        "max-len": 0,
        "newline-per-chained-call": 1,
        "no-alert": 0,
        "no-confusing-arrow": 0,
        "no-console": 1,
        "no-unused-vars": 2,
        "no-use-before-define": 0,
        "prefer-template": 2,
        "react/forbid-prop-types": 0,
        "react/jsx-first-prop-new-line": [
            2,
            "multiline"
        ],
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js",
                    ".jsx"
                ]
            }
        ],
        "react/jsx-no-target-blank": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/require-extension": 0,
        "react/self-closing-comp": 0,
        "react/jsx-one-expression-per-line": 0,
        "semi": [
            2,
            "always"
        ]
    }
};