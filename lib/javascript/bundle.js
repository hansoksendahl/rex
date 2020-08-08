// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

/** @author Hans Oksendahl */
System.register("util/types/AnyArray", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/types/AnyKey", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/types/AnyObject", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/types/AnyFunction", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/types/abstract/Extends", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/types/abstract/mod", ["util/types/abstract/Extends"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_6(exports);
    }
    return {
        setters: [
            function (Extends_ts_1_1) {
                exportStar_1(Extends_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/types/mod", ["util/types/AnyObject", "util/types/AnyFunction", "util/types/abstract/mod"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_7(exports);
    }
    return {
        setters: [
            function (AnyObject_ts_1_1) {
                exportStar_2(AnyObject_ts_1_1);
            },
            function (AnyFunction_ts_1_1) {
                exportStar_2(AnyFunction_ts_1_1);
            },
            function (mod_ts_1_1) {
                exportStar_2(mod_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/createWhich", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function createWhich(ref, defaultKey) {
        return (key) => (defaultKey
            ? ref[key] || defaultKey && ref[defaultKey]
            : ref[key]);
    }
    exports_8("default", createWhich);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/createRoute", ["util/createWhich"], function (exports_9, context_9) {
    "use strict";
    var createWhich_ts_1;
    var __moduleName = context_9 && context_9.id;
    function createRoute(methods) {
        const which = createWhich_ts_1.default(methods);
        return (key, params) => which(key)(...params);
    }
    exports_9("default", createRoute);
    return {
        setters: [
            function (createWhich_ts_1_1) {
                createWhich_ts_1 = createWhich_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/getProp", [], function (exports_10, context_10) {
    "use strict";
    var GetProp;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            // NOTE This utility class enables indexing of properties from a generic type.
            //      It will be made obsolete when partial type argument inferrence lands in
            //      TypeScript.
            GetProp = class GetProp {
                static of() {
                    return new GetProp();
                }
                get(...props) {
                    return function (ref) {
                        let currentRef = ref;
                        if (currentRef) {
                            for (let prop of props) {
                                currentRef = currentRef[prop];
                                if (!currentRef) {
                                    break;
                                }
                            }
                        }
                        return currentRef;
                    };
                }
            };
            exports_10("GetProp", GetProp);
            exports_10("default", GetProp.of);
        }
    };
});
System.register("util/createWeakStore", ["util/getProp"], function (exports_11, context_11) {
    "use strict";
    var getProp_ts_1, WeakStore;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (getProp_ts_1_1) {
                getProp_ts_1 = getProp_ts_1_1;
            }
        ],
        execute: function () {
            WeakStore = class WeakStore {
                constructor() {
                    this.store = new WeakMap();
                    this.getMethod = getProp_ts_1.default().get;
                }
                static of() {
                    return new WeakStore();
                }
                get(identity) {
                    return this.store.get(identity);
                }
                set(identity, value) {
                    return this.store.set(identity, value);
                }
                has(identity) {
                    return this.store.has(identity);
                }
                delete(identity) {
                    return this.store.delete(identity);
                }
                setProp(identity, key, value) {
                    const entry = this.store.get(identity) || Object.create(null);
                    entry[key] = value;
                    this.store.set(identity, entry);
                }
                getProp(identity, key) {
                    const entry = this.store.get(identity);
                    return entry && entry[key];
                }
                hasProp(identity, key) {
                    const entry = this.store.get(identity);
                    return entry && entry[key] !== void 0;
                }
                deleteProp(identity, key) {
                    const entry = this.store.get(identity);
                    if (entry) {
                        delete entry[key];
                    }
                }
            };
            exports_11("default", WeakStore.of);
        }
    };
});
System.register("util/isShallowEqual", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    /**
     * Check that `a` and `b` are equal.
     *
     * @param a
     * @param b
     */
    function areEqual(a, b) {
        return a === b;
    }
    /**
     * Check that all the top level properties of `prev` and `next` are equal.
     *
     * @param prev
     * @param next
     * @param equalityCheck
     */
    function areParamsShallowEqual(prev, next, equalityCheck = areEqual) {
        if (!prev || (prev && prev.length !== next.length)) {
            return false;
        }
        else {
            return prev.every((prevItem, i) => equalityCheck(prevItem, next[i]));
        }
    }
    exports_12("default", areParamsShallowEqual);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/diff/types", [], function (exports_13, context_13) {
    "use strict";
    var DiffKeys;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            (function (DiffKeys) {
                DiffKeys[DiffKeys["create"] = 0] = "create";
                DiffKeys[DiffKeys["update"] = 1] = "update";
                DiffKeys[DiffKeys["remove"] = 2] = "remove";
            })(DiffKeys || (DiffKeys = {}));
            exports_13("DiffKeys", DiffKeys);
            ;
        }
    };
});
System.register("util/diff/createKeyAction", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function createKeyAction(type, key, value) {
        return {
            type,
            key,
            value
        };
    }
    exports_14("default", createKeyAction);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("util/diff/mod", ["util/diff/types", "util/diff/createKeyAction"], function (exports_15, context_15) {
    "use strict";
    var types_ts_1, createKeyAction_ts_1;
    var __moduleName = context_15 && context_15.id;
    /**
     *
     * @param previous The previous tree
     * @param current The current tree
     * @param overrideKeys Explicitly named keys from `previous` and `current`
     */
    function diff(previous, current, overrideKeys) {
        const changes = [];
        let keys;
        if (!overrideKeys) {
            keys = new Set([
                ...Object.keys(previous || []),
                ...Object.keys(current || []),
            ]);
        }
        else {
            keys = new Set(overrideKeys);
        }
        for (let key of keys) {
            const previousValue = previous
                ? previous[key]
                : void 0;
            const previousHasKey = previousValue !== void 0;
            const currentValue = current
                ? current[key]
                : void 0;
            const currentHasKey = currentValue !== void 0;
            if (previousHasKey && !currentHasKey) {
                changes.push(createKeyAction_ts_1.default(types_ts_1.DiffKeys.remove, key, previousValue));
            }
            else if (!previousHasKey && currentHasKey) {
                changes.push(createKeyAction_ts_1.default(types_ts_1.DiffKeys.create, key, currentValue));
            }
            else if (previousValue !== currentValue) {
                changes.push(createKeyAction_ts_1.default(types_ts_1.DiffKeys.update, key, currentValue));
            }
        }
        return changes.length > 0 ? changes : null;
    }
    exports_15("default", diff);
    return {
        setters: [
            function (types_ts_1_1) {
                types_ts_1 = types_ts_1_1;
            },
            function (createKeyAction_ts_1_1) {
                createKeyAction_ts_1 = createKeyAction_ts_1_1;
            }
        ],
        execute: function () {
            exports_15("DiffKeys", types_ts_1.DiffKeys);
        }
    };
});
System.register("util/vdom/processParams", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    /**
     * Reusable hunk of code for processing children and properties
     * @param params
     * @param node
     */
    function processParams(params, node = {}) {
        switch (params.length) {
            case 2: {
                const [properties, children] = params;
                node.properties = properties;
                node.children = children;
                break;
            }
            case 1: {
                const [param] = params;
                if (Array.isArray(param)) {
                    node.children = param;
                }
                else {
                    node.properties = param;
                }
                break;
            }
        }
        return node;
    }
    exports_16("default", processParams);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/vdom/constants", [], function (exports_17, context_17) {
    "use strict";
    var NodeKeys, Namespace;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            /** @author Hans Oksendahl */
            (function (NodeKeys) {
                NodeKeys[NodeKeys["Text"] = 0] = "Text";
                NodeKeys[NodeKeys["Element"] = 1] = "Element";
                NodeKeys[NodeKeys["Component"] = 2] = "Component";
            })(NodeKeys || (NodeKeys = {}));
            exports_17("NodeKeys", NodeKeys);
            (function (Namespace) {
                Namespace["HTML"] = "http://www.w3.org/1999/xhtml";
                Namespace["SVG"] = "http://www.w3.org/2000/svg";
                Namespace["MathML"] = "http://www.w3.org/1998/Math/MathML";
            })(Namespace || (Namespace = {}));
            exports_17("Namespace", Namespace);
        }
    };
});
System.register("util/vdom/types", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/vdom/createElement", ["util/vdom/processParams", "util/vdom/constants"], function (exports_19, context_19) {
    "use strict";
    var processParams_ts_1, constants_ts_1;
    var __moduleName = context_19 && context_19.id;
    function createElement(namespace, tag, ...params) {
        const element = {
            type: constants_ts_1.NodeKeys.Element,
            namespace,
            tag
        };
        processParams_ts_1.default(params, element);
        return element;
    }
    exports_19("default", createElement);
    return {
        setters: [
            function (processParams_ts_1_1) {
                processParams_ts_1 = processParams_ts_1_1;
            },
            function (constants_ts_1_1) {
                constants_ts_1 = constants_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/createHTML", ["util/vdom/createElement", "util/vdom/constants"], function (exports_20, context_20) {
    "use strict";
    var createElement_ts_1, constants_ts_2;
    var __moduleName = context_20 && context_20.id;
    /**
     * Create an abstract representation of an HTML element.
     *
     * @param tag An HTML tag name
     * @param params
     */
    function html(tag, ...params) {
        return createElement_ts_1.default(constants_ts_2.Namespace.HTML, tag, ...params);
    }
    exports_20("default", html);
    return {
        setters: [
            function (createElement_ts_1_1) {
                createElement_ts_1 = createElement_ts_1_1;
            },
            function (constants_ts_2_1) {
                constants_ts_2 = constants_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/createSVG", ["util/vdom/createElement", "util/vdom/constants"], function (exports_21, context_21) {
    "use strict";
    var createElement_ts_2, constants_ts_3;
    var __moduleName = context_21 && context_21.id;
    /**
     * Create an abstract representation of an SVG element.
     *
     * @param tag An SVG tag name
     * @param params
     */
    function svg(tag, ...params) {
        return createElement_ts_2.default(constants_ts_3.Namespace.SVG, tag, ...params);
    }
    exports_21("default", svg);
    return {
        setters: [
            function (createElement_ts_2_1) {
                createElement_ts_2 = createElement_ts_2_1;
            },
            function (constants_ts_3_1) {
                constants_ts_3 = constants_ts_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/createText", ["util/vdom/constants"], function (exports_22, context_22) {
    "use strict";
    var constants_ts_4;
    var __moduleName = context_22 && context_22.id;
    /**
     * The function `createText` is almost brutal in its simplicity it creates an
     * abstract representation of a text node. A leaf on the proverbial VDOM tree.
     *
     * @param value
     */
    function createText(value) {
        return { type: constants_ts_4.NodeKeys.Text, value };
    }
    exports_22("default", createText);
    return {
        setters: [
            function (constants_ts_4_1) {
                constants_ts_4 = constants_ts_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/createComponent", ["util/vdom/constants", "util/vdom/processParams"], function (exports_23, context_23) {
    "use strict";
    var constants_ts_5, processParams_ts_2;
    var __moduleName = context_23 && context_23.id;
    function createComponent(component, ...params) {
        const node = {
            type: constants_ts_5.NodeKeys.Component,
            component,
        };
        processParams_ts_2.default(params, node);
        return node;
    }
    exports_23("default", createComponent);
    return {
        setters: [
            function (constants_ts_5_1) {
                constants_ts_5 = constants_ts_5_1;
            },
            function (processParams_ts_2_1) {
                processParams_ts_2 = processParams_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/vdom/isComponent", ["util/vdom/constants"], function (exports_24, context_24) {
    "use strict";
    var constants_ts_6;
    var __moduleName = context_24 && context_24.id;
    /**
     * Return whether an abstract node is of the type component
     * @param item
     */
    function isComponent(item) {
        return item.type === constants_ts_6.NodeKeys.Component;
    }
    exports_24("default", isComponent);
    return {
        setters: [
            function (constants_ts_6_1) {
                constants_ts_6 = constants_ts_6_1;
            }
        ],
        execute: function () {
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/vdom/isElement", ["util/vdom/constants"], function (exports_25, context_25) {
    "use strict";
    var constants_ts_7;
    var __moduleName = context_25 && context_25.id;
    /**
     * Return whether an abstract node is of the type element
     * @param item
     */
    function isElement(item) {
        return item.type === constants_ts_7.NodeKeys.Element;
    }
    exports_25("default", isElement);
    return {
        setters: [
            function (constants_ts_7_1) {
                constants_ts_7 = constants_ts_7_1;
            }
        ],
        execute: function () {
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/vdom/isText", ["util/vdom/constants"], function (exports_26, context_26) {
    "use strict";
    var constants_ts_8;
    var __moduleName = context_26 && context_26.id;
    /**
     * Return whether an abstract node is of the type text
     * @param item
     */
    function isText(item) {
        return item.type === constants_ts_8.NodeKeys.Text;
    }
    exports_26("default", isText);
    return {
        setters: [
            function (constants_ts_8_1) {
                constants_ts_8 = constants_ts_8_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/chest/types", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/vdom/chest/isTextValue", [], function (exports_28, context_28) {
    "use strict";
    var TYPE_STRING, TYPE_NUMBER;
    var __moduleName = context_28 && context_28.id;
    function isTextValue(node) {
        const type = typeof node;
        return type === TYPE_STRING || type === TYPE_NUMBER;
    }
    exports_28("default", isTextValue);
    return {
        setters: [],
        execute: function () {
            TYPE_STRING = 'string';
            TYPE_NUMBER = 'number';
        }
    };
});
/** @author Hans Oksendahl */
System.register("util/vdom/isNode", ["util/vdom/isComponent", "util/vdom/isText", "util/vdom/isElement"], function (exports_29, context_29) {
    "use strict";
    var isComponent_ts_1, isText_ts_1, isElement_ts_1;
    var __moduleName = context_29 && context_29.id;
    function isNode(node) {
        return (isComponent_ts_1.default(node) ||
            isElement_ts_1.default(node) ||
            isText_ts_1.default(node));
    }
    exports_29("default", isNode);
    return {
        setters: [
            function (isComponent_ts_1_1) {
                isComponent_ts_1 = isComponent_ts_1_1;
            },
            function (isText_ts_1_1) {
                isText_ts_1 = isText_ts_1_1;
            },
            function (isElement_ts_1_1) {
                isElement_ts_1 = isElement_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/chest/createChildren", ["util/vdom/createText", "util/vdom/chest/isTextValue", "util/vdom/isNode"], function (exports_30, context_30) {
    "use strict";
    var createText_ts_1, isTextValue_ts_1, isNode_ts_1;
    var __moduleName = context_30 && context_30.id;
    function default_1(nodes) {
        if (!nodes) {
            return [];
        }
        else if (isTextValue_ts_1.default(nodes)) {
            return [createText_ts_1.default(nodes)];
        }
        else if (isNode_ts_1.default(nodes)) {
            return [nodes];
        }
        else {
            const children = [];
            for (const node of nodes) {
                const child = isTextValue_ts_1.default(node)
                    ? createText_ts_1.default(node)
                    : node;
                children.push(child);
            }
            return children;
        }
    }
    exports_30("default", default_1);
    return {
        setters: [
            function (createText_ts_1_1) {
                createText_ts_1 = createText_ts_1_1;
            },
            function (isTextValue_ts_1_1) {
                isTextValue_ts_1 = isTextValue_ts_1_1;
            },
            function (isNode_ts_1_1) {
                isNode_ts_1 = isNode_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/chest/imbueTextValueParams", ["util/vdom/chest/createChildren", "util/vdom/isNode"], function (exports_31, context_31) {
    "use strict";
    var createChildren_ts_1, isNode_ts_2;
    var __moduleName = context_31 && context_31.id;
    /**
     * Massage the parameters to `createElement` after `tag`
     *
     *     createElement(namespace: string, tag: string, ...params: any[])
     *
     * Such that the following functional signatures become possible.
     *
     *     createElement(namespace: string, tag: string, child: TextValue | AbstractNode)
     *
     *     createElement(namespace: string, tag: string, child: Array<TextValue | AbstractNode>)
     *
     * This is a terrible hack done on an otherwise conistent API.
     */
    function imbueTextValueParams(params, node) {
        switch (params.length) {
            case 2: {
                const [properties, children] = params;
                node.properties = properties;
                node.children = createChildren_ts_1.default(children);
                break;
            }
            case 1: {
                const [param] = params;
                if (!param) {
                    node.children = [];
                }
                else if (Array.isArray(param) ||
                    isNode_ts_2.default(param)) {
                    node.children = createChildren_ts_1.default(param);
                }
                else {
                    node.properties = param;
                    node.children = param.children && createChildren_ts_1.default(param.children);
                }
                break;
            }
        }
        return node;
    }
    exports_31("default", imbueTextValueParams);
    return {
        setters: [
            function (createChildren_ts_1_1) {
                createChildren_ts_1 = createChildren_ts_1_1;
            },
            function (isNode_ts_2_1) {
                isNode_ts_2 = isNode_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/chest/c", ["util/vdom/mod", "util/vdom/chest/imbueTextValueParams"], function (exports_32, context_32) {
    "use strict";
    var mod_ts_2, imbueTextValueParams_ts_1;
    var __moduleName = context_32 && context_32.id;
    function createAbstractComponent(component, ...params) {
        const node = mod_ts_2.createComponent(component);
        imbueTextValueParams_ts_1.default(params, node);
        return node;
    }
    exports_32("default", createAbstractComponent);
    return {
        setters: [
            function (mod_ts_2_1) {
                mod_ts_2 = mod_ts_2_1;
            },
            function (imbueTextValueParams_ts_1_1) {
                imbueTextValueParams_ts_1 = imbueTextValueParams_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/vdom/chest/h", ["util/vdom/mod", "util/vdom/chest/imbueTextValueParams"], function (exports_33, context_33) {
    "use strict";
    var mod_ts_3, imbueTextValueParams_ts_2;
    var __moduleName = context_33 && context_33.id;
    function createAbstractHTML(tag) {
        return (...params) => {
            // Take a pristine abstract representation of a namespaced HTML tag.
            const node = mod_ts_3.createHTML(tag);
            // Imbue it with magical powers.
            imbueTextValueParams_ts_2.default(params, node);
            return node;
        };
    }
    return {
        setters: [
            function (mod_ts_3_1) {
                mod_ts_3 = mod_ts_3_1;
            },
            function (imbueTextValueParams_ts_2_1) {
                imbueTextValueParams_ts_2 = imbueTextValueParams_ts_2_1;
            }
        ],
        execute: function () {
            exports_33("default", {
                a: createAbstractHTML('a'),
                abbr: createAbstractHTML('abbr'),
                acronym: createAbstractHTML('acronym'),
                address: createAbstractHTML('address'),
                applet: createAbstractHTML('applet'),
                area: createAbstractHTML('area'),
                article: createAbstractHTML('article'),
                aside: createAbstractHTML('aside'),
                audio: createAbstractHTML('audio'),
                b: createAbstractHTML('b'),
                base: createAbstractHTML('base'),
                basefont: createAbstractHTML('basefont'),
                bdi: createAbstractHTML('bdi'),
                bdo: createAbstractHTML('bdo'),
                big: createAbstractHTML('big'),
                blockquote: createAbstractHTML('blockquote'),
                body: createAbstractHTML('body'),
                br: createAbstractHTML('br'),
                button: createAbstractHTML('button'),
                canvas: createAbstractHTML('canvas'),
                caption: createAbstractHTML('caption'),
                center: createAbstractHTML('center'),
                cite: createAbstractHTML('cite'),
                code: createAbstractHTML('code'),
                col: createAbstractHTML('col'),
                colgroup: createAbstractHTML('colgroup'),
                data: createAbstractHTML('data'),
                datalist: createAbstractHTML('datalist'),
                dd: createAbstractHTML('dd'),
                del: createAbstractHTML('del'),
                details: createAbstractHTML('details'),
                dfn: createAbstractHTML('dfn'),
                dialog: createAbstractHTML('dialog'),
                dir: createAbstractHTML('dir'),
                div: createAbstractHTML('div'),
                dl: createAbstractHTML('dl'),
                dt: createAbstractHTML('dt'),
                em: createAbstractHTML('em'),
                embed: createAbstractHTML('embed'),
                fieldset: createAbstractHTML('fieldset'),
                figcaption: createAbstractHTML('figcaption'),
                figure: createAbstractHTML('figure'),
                font: createAbstractHTML('font'),
                footer: createAbstractHTML('footer'),
                form: createAbstractHTML('form'),
                frame: createAbstractHTML('frame'),
                frameset: createAbstractHTML('frameset'),
                h1: createAbstractHTML('h1'),
                h2: createAbstractHTML('h2'),
                h3: createAbstractHTML('h3'),
                h4: createAbstractHTML('h4'),
                h5: createAbstractHTML('h5'),
                h6: createAbstractHTML('h6'),
                head: createAbstractHTML('head'),
                header: createAbstractHTML('header'),
                hr: createAbstractHTML('hr'),
                html: createAbstractHTML('html'),
                i: createAbstractHTML('i'),
                iframe: createAbstractHTML('iframe'),
                img: createAbstractHTML('img'),
                input: createAbstractHTML('input'),
                ins: createAbstractHTML('ins'),
                kbd: createAbstractHTML('kbd'),
                label: createAbstractHTML('label'),
                legend: createAbstractHTML('legend'),
                li: createAbstractHTML('li'),
                link: createAbstractHTML('link'),
                main: createAbstractHTML('main'),
                map: createAbstractHTML('map'),
                mark: createAbstractHTML('mark'),
                meta: createAbstractHTML('meta'),
                meter: createAbstractHTML('meter'),
                nav: createAbstractHTML('nav'),
                noframes: createAbstractHTML('noframes'),
                noscript: createAbstractHTML('noscript'),
                object: createAbstractHTML('object'),
                ol: createAbstractHTML('ol'),
                optgroup: createAbstractHTML('optgroup'),
                option: createAbstractHTML('option'),
                output: createAbstractHTML('output'),
                p: createAbstractHTML('p'),
                param: createAbstractHTML('param'),
                picture: createAbstractHTML('picture'),
                pre: createAbstractHTML('pre'),
                progress: createAbstractHTML('progress'),
                q: createAbstractHTML('q'),
                rp: createAbstractHTML('rp'),
                rt: createAbstractHTML('rt'),
                ruby: createAbstractHTML('ruby'),
                s: createAbstractHTML('s'),
                samp: createAbstractHTML('samp'),
                script: createAbstractHTML('script'),
                section: createAbstractHTML('section'),
                select: createAbstractHTML('select'),
                small: createAbstractHTML('small'),
                source: createAbstractHTML('source'),
                span: createAbstractHTML('span'),
                strike: createAbstractHTML('strike'),
                strong: createAbstractHTML('strong'),
                style: createAbstractHTML('style'),
                sub: createAbstractHTML('sub'),
                summary: createAbstractHTML('summary'),
                sup: createAbstractHTML('sup'),
                svg: createAbstractHTML('svg'),
                table: createAbstractHTML('table'),
                tbody: createAbstractHTML('tbody'),
                td: createAbstractHTML('td'),
                template: createAbstractHTML('template'),
                textarea: createAbstractHTML('textarea'),
                tfoot: createAbstractHTML('tfoot'),
                th: createAbstractHTML('th'),
                thead: createAbstractHTML('thead'),
                time: createAbstractHTML('time'),
                title: createAbstractHTML('title'),
                tr: createAbstractHTML('tr'),
                track: createAbstractHTML('track'),
                tt: createAbstractHTML('tt'),
                u: createAbstractHTML('u'),
                ul: createAbstractHTML('ul'),
                var: createAbstractHTML('var'),
                video: createAbstractHTML('video'),
                wbr: createAbstractHTML('wbr')
            });
        }
    };
});
System.register("util/vdom/chest/s", ["util/vdom/mod", "util/vdom/chest/imbueTextValueParams"], function (exports_34, context_34) {
    "use strict";
    var mod_ts_4, imbueTextValueParams_ts_3;
    var __moduleName = context_34 && context_34.id;
    /**
     * Create an abstract SVG element
     * @param tag
     */
    function createAbstractSVG(tag) {
        return (...params) => {
            const node = mod_ts_4.createSVG(tag);
            imbueTextValueParams_ts_3.default(params, node);
            return node;
        };
    }
    return {
        setters: [
            function (mod_ts_4_1) {
                mod_ts_4 = mod_ts_4_1;
            },
            function (imbueTextValueParams_ts_3_1) {
                imbueTextValueParams_ts_3 = imbueTextValueParams_ts_3_1;
            }
        ],
        execute: function () {
            exports_34("default", {
                animateMotion: createAbstractSVG('animateMotion'),
                animateTransform: createAbstractSVG('animateTransform'),
                circle: createAbstractSVG('circle'),
                clipPath: createAbstractSVG('clipPath'),
                colorProfile: createAbstractSVG('color-profile'),
                defs: createAbstractSVG('defs'),
                desc: createAbstractSVG('desc'),
                discard: createAbstractSVG('discard'),
                ellipse: createAbstractSVG('ellipse'),
                feBlend: createAbstractSVG('feBlend'),
                feColorMatrix: createAbstractSVG('feColorMatrix'),
                feComponentTransfer: createAbstractSVG('feComponentTransfer'),
                feComposite: createAbstractSVG('feComposite'),
                feConvolveMatrix: createAbstractSVG('feConvolveMatrix'),
                feDiffuseLighting: createAbstractSVG('feDiffuseLighting'),
                feDisplacementMap: createAbstractSVG('feDisplacementMap'),
                feDistantLight: createAbstractSVG('feDistantLight'),
                feDropShadow: createAbstractSVG('feDropShadow'),
                feFlood: createAbstractSVG('feFlood'),
                feFuncA: createAbstractSVG('feFuncA'),
                feFuncB: createAbstractSVG('feFuncB'),
                feFuncG: createAbstractSVG('feFuncG'),
                feFuncR: createAbstractSVG('feFuncR'),
                feGaussianBlur: createAbstractSVG('feGaussianBlur'),
                feImage: createAbstractSVG('feImage'),
                feMerge: createAbstractSVG('feMerge'),
                feMergeNode: createAbstractSVG('feMergeNode'),
                feMorphology: createAbstractSVG('feMorphology'),
                feOffset: createAbstractSVG('feOffset'),
                fePointLight: createAbstractSVG('fePointLight'),
                feSpecularLighting: createAbstractSVG('feSpecularLighting'),
                feSpotLight: createAbstractSVG('feSpotLight'),
                feTile: createAbstractSVG('feTile'),
                feTurbulence: createAbstractSVG('feTurbulence'),
                filter: createAbstractSVG('filter'),
                foreignObject: createAbstractSVG('foreignObject'),
                g: createAbstractSVG('g'),
                hatch: createAbstractSVG('hatch'),
                hatchpath: createAbstractSVG('hatchpath'),
                image: createAbstractSVG('image'),
                line: createAbstractSVG('line'),
                linearGradient: createAbstractSVG('linearGradient'),
                marker: createAbstractSVG('marker'),
                mask: createAbstractSVG('mask'),
                mesh: createAbstractSVG('mesh'),
                meshgradient: createAbstractSVG('meshgradient'),
                meshpatch: createAbstractSVG('meshpatch'),
                meshrow: createAbstractSVG('meshrow'),
                metadata: createAbstractSVG('metadata'),
                mpath: createAbstractSVG('mpath'),
                path: createAbstractSVG('path'),
                pattern: createAbstractSVG('pattern'),
                polygon: createAbstractSVG('polygon'),
                polyline: createAbstractSVG('polyline'),
                radialGradient: createAbstractSVG('radialGradient'),
                rect: createAbstractSVG('rect'),
                script: createAbstractSVG('script'),
                set: createAbstractSVG('set'),
                solidcolor: createAbstractSVG('solidcolor'),
                stop: createAbstractSVG('stop'),
                style: createAbstractSVG('style'),
                svg: createAbstractSVG('svg'),
                switch: createAbstractSVG('switch'),
                symbol: createAbstractSVG('symbol'),
                text: createAbstractSVG('text'),
                textPath: createAbstractSVG('textPath'),
                title: createAbstractSVG('title'),
                tspan: createAbstractSVG('tspan'),
                unknown: createAbstractSVG('unknown'),
                use: createAbstractSVG('use'),
                view: createAbstractSVG('view'),
            });
        }
    };
});
System.register("util/vdom/chest/mod", ["util/vdom/mod", "util/vdom/chest/c", "util/vdom/chest/h", "util/vdom/chest/s", "util/vdom/chest/types"], function (exports_35, context_35) {
    "use strict";
    var mod_ts_5, c_ts_1, h_ts_1, s_ts_1;
    var __moduleName = context_35 && context_35.id;
    var exportedNames_1 = {
        "c": true,
        "h": true,
        "e": true,
        "s": true,
        "t": true
    };
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_35(exports);
    }
    return {
        setters: [
            function (mod_ts_5_1) {
                mod_ts_5 = mod_ts_5_1;
            },
            function (c_ts_1_1) {
                c_ts_1 = c_ts_1_1;
            },
            function (h_ts_1_1) {
                h_ts_1 = h_ts_1_1;
            },
            function (s_ts_1_1) {
                s_ts_1 = s_ts_1_1;
            },
            function (types_ts_2_1) {
                exportStar_3(types_ts_2_1);
            }
        ],
        execute: function () {
            exports_35("t", mod_ts_5.createText);
            exports_35("e", mod_ts_5.default);
            exports_35("c", c_ts_1.default);
            exports_35("h", h_ts_1.default);
            exports_35("s", s_ts_1.default);
        }
    };
});
System.register("util/vdom/mod", ["util/vdom/createElement", "util/vdom/createHTML", "util/vdom/createSVG", "util/vdom/createText", "util/vdom/createComponent", "util/vdom/isComponent", "util/vdom/isElement", "util/vdom/isText", "util/vdom/constants", "util/vdom/types", "util/vdom/chest/mod"], function (exports_36, context_36) {
    "use strict";
    var createElement_ts_3;
    var __moduleName = context_36 && context_36.id;
    var exportedNames_2 = {
        "createHTML": true,
        "createSVG": true,
        "createText": true,
        "createComponent": true,
        "isComponent": true,
        "isElement": true,
        "isText": true,
        "NodeKeys": true
    };
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_2.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_36(exports);
    }
    return {
        setters: [
            function (createElement_ts_3_1) {
                createElement_ts_3 = createElement_ts_3_1;
            },
            function (createHTML_ts_1_1) {
                exports_36({
                    "createHTML": createHTML_ts_1_1["default"]
                });
            },
            function (createSVG_ts_1_1) {
                exports_36({
                    "createSVG": createSVG_ts_1_1["default"]
                });
            },
            function (createText_ts_2_1) {
                exports_36({
                    "createText": createText_ts_2_1["default"]
                });
            },
            function (createComponent_ts_1_1) {
                exports_36({
                    "createComponent": createComponent_ts_1_1["default"]
                });
            },
            function (isComponent_ts_2_1) {
                exports_36({
                    "isComponent": isComponent_ts_2_1["default"]
                });
            },
            function (isElement_ts_2_1) {
                exports_36({
                    "isElement": isElement_ts_2_1["default"]
                });
            },
            function (isText_ts_2_1) {
                exports_36({
                    "isText": isText_ts_2_1["default"]
                });
            },
            function (constants_ts_9_1) {
                exports_36({
                    "NodeKeys": constants_ts_9_1["NodeKeys"]
                });
                exportStar_4(constants_ts_9_1);
            },
            function (types_ts_3_1) {
                exportStar_4(types_ts_3_1);
            },
            function (mod_ts_6_1) {
                exportStar_4(mod_ts_6_1);
            }
        ],
        execute: function () {
            exports_36("default", createElement_ts_3.default);
        }
    };
});
System.register("util/measurement", [], function (exports_37, context_37) {
    "use strict";
    var Measurements;
    var __moduleName = context_37 && context_37.id;
    function createMeasurement(type, magnitude) {
        return {
            type,
            magnitude,
            toString: () => `${magnitude}${type}`
        };
    }
    exports_37("createMeasurement", createMeasurement);
    function em(magnitude) {
        return createMeasurement(Measurements.Em, magnitude);
    }
    exports_37("em", em);
    function rem(magnitude) {
        return createMeasurement(Measurements.Rem, magnitude);
    }
    exports_37("rem", rem);
    function px(magnitude) {
        return createMeasurement(Measurements.Px, magnitude);
    }
    exports_37("px", px);
    function percent(magnitude) {
        return createMeasurement(Measurements.Percent, magnitude);
    }
    exports_37("percent", percent);
    function turn(magnitude) {
        return createMeasurement(Measurements.Turn, magnitude);
    }
    exports_37("turn", turn);
    function deg(magnitude) {
        return createMeasurement(Measurements.Deg, magnitude);
    }
    exports_37("deg", deg);
    function rad(magnitude) {
        return createMeasurement(Measurements.Rad, magnitude);
    }
    exports_37("rad", rad);
    function grad(magnitude) {
        return createMeasurement(Measurements.Grad, magnitude);
    }
    exports_37("grad", grad);
    return {
        setters: [],
        execute: function () {
            (function (Measurements) {
                Measurements["Turn"] = "turn";
                Measurements["Deg"] = "deg";
                Measurements["Rad"] = "rad";
                Measurements["Grad"] = "grad";
                Measurements["Percent"] = "%";
                Measurements["Px"] = "px";
                Measurements["Em"] = "em";
                Measurements["Rem"] = "rem";
            })(Measurements || (Measurements = {}));
            exports_37("Measurements", Measurements);
        }
    };
});
System.register("util/transform", [], function (exports_38, context_38) {
    "use strict";
    var Transforms;
    var __moduleName = context_38 && context_38.id;
    function createTransformType(type, ...measurements) {
        return {
            type,
            measurements,
            toString: () => `${type}(${measurements.join(', ')})`
        };
    }
    exports_38("createTransformType", createTransformType);
    function matrix(...measurement) {
        return createTransformType(Transforms.Matrix, ...measurement);
    }
    exports_38("matrix", matrix);
    function rotate(...measurement) {
        return createTransformType(Transforms.Rotate, ...measurement);
    }
    exports_38("rotate", rotate);
    function scale(...measurement) {
        return createTransformType(Transforms.Scale, ...measurement);
    }
    exports_38("scale", scale);
    function scaleX(...measurement) {
        return createTransformType(Transforms.ScaleX, ...measurement);
    }
    exports_38("scaleX", scaleX);
    function scaleY(...measurement) {
        return createTransformType(Transforms.ScaleY, ...measurement);
    }
    exports_38("scaleY", scaleY);
    function translate(...measurement) {
        return createTransformType(Transforms.Translate, ...measurement);
    }
    exports_38("translate", translate);
    function translateX(...measurement) {
        return createTransformType(Transforms.TranslateX, ...measurement);
    }
    exports_38("translateX", translateX);
    function translateY(...measurement) {
        return createTransformType(Transforms.TranslateY, ...measurement);
    }
    exports_38("translateY", translateY);
    return {
        setters: [],
        execute: function () {
            (function (Transforms) {
                Transforms["Matrix"] = "matrix";
                Transforms["Rotate"] = "rotate";
                Transforms["Scale"] = "scale";
                Transforms["ScaleX"] = "scaleX";
                Transforms["ScaleY"] = "scaleY";
                Transforms["Translate"] = "translate";
                Transforms["TranslateX"] = "translateX";
                Transforms["TranslateY"] = "translateY";
            })(Transforms || (Transforms = {}));
            exports_38("Transforms", Transforms);
        }
    };
});
System.register("util/mod", ["util/createRoute", "util/createWhich", "util/createWeakStore", "util/isShallowEqual", "util/getProp", "util/diff/mod", "util/types/mod", "util/vdom/mod", "util/transform", "util/measurement"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var exportedNames_3 = {
        "createRoute": true,
        "createWhich": true,
        "createWeakStore": true,
        "isShallowEqual": true,
        "getProp": true,
        "diff": true
    };
    function exportStar_5(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_3.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_39(exports);
    }
    return {
        setters: [
            function (createRoute_ts_1_1) {
                exports_39({
                    "createRoute": createRoute_ts_1_1["default"]
                });
            },
            function (createWhich_ts_2_1) {
                exports_39({
                    "createWhich": createWhich_ts_2_1["default"]
                });
            },
            function (createWeakStore_ts_1_1) {
                exports_39({
                    "createWeakStore": createWeakStore_ts_1_1["default"]
                });
            },
            function (isShallowEqual_ts_1_1) {
                exports_39({
                    "isShallowEqual": isShallowEqual_ts_1_1["default"]
                });
            },
            function (getProp_ts_2_1) {
                exports_39({
                    "getProp": getProp_ts_2_1["default"]
                });
            },
            function (mod_ts_7_1) {
                exports_39({
                    "diff": mod_ts_7_1["default"]
                });
                exportStar_5(mod_ts_7_1);
            },
            function (mod_ts_8_1) {
                exportStar_5(mod_ts_8_1);
            },
            function (mod_ts_9_1) {
                exportStar_5(mod_ts_9_1);
            },
            function (transform_ts_1_1) {
                exportStar_5(transform_ts_1_1);
            },
            function (measurement_ts_1_1) {
                exportStar_5(measurement_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("client/util/constants", [], function (exports_40, context_40) {
    "use strict";
    var W, D;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [],
        execute: function () {
            exports_40("W", W = window);
            exports_40("D", D = document);
        }
    };
});
System.register("client/util/createElement", ["client/util/constants"], function (exports_41, context_41) {
    "use strict";
    var constants_ts_10;
    var __moduleName = context_41 && context_41.id;
    /**
     * Create a namespaced DOM element.
     * @param ns
     * @param name
     * @param options
     */
    function createElement(ns, name, options) {
        return constants_ts_10.D.createElementNS(ns, name, options);
    }
    exports_41("default", createElement);
    return {
        setters: [
            function (constants_ts_10_1) {
                constants_ts_10 = constants_ts_10_1;
            }
        ],
        execute: function () {
            ;
        }
    };
});
System.register("client/util/createText", ["client/util/constants"], function (exports_42, context_42) {
    "use strict";
    var constants_ts_11;
    var __moduleName = context_42 && context_42.id;
    /**
     * Crete a text node
     * @param content
     */
    function createText(content) {
        return constants_ts_11.D.createTextNode(`${content}`);
    }
    exports_42("default", createText);
    return {
        setters: [
            function (constants_ts_11_1) {
                constants_ts_11 = constants_ts_11_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("client/util/removeAttribute", [], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    /**
     * Remove an attribute
     * @param ns
     * @param element
     * @param name
     */
    function removeAttribute(ns, element, name) {
        return element.removeAttributeNS(ns, name);
    }
    exports_43("default", removeAttribute);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("client/util/setAttribute", [], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    function setAttribute(ns, element, name, value) {
        return element.setAttributeNS(null, name, value);
    }
    exports_44("default", setAttribute);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("client/util/setTitle", ["client/util/constants"], function (exports_45, context_45) {
    "use strict";
    var constants_ts_12;
    var __moduleName = context_45 && context_45.id;
    function setTitle(title) {
        constants_ts_12.D.title = title;
    }
    exports_45("default", setTitle);
    return {
        setters: [
            function (constants_ts_12_1) {
                constants_ts_12 = constants_ts_12_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("client/util/mod", ["client/util/constants", "client/util/createElement", "client/util/createText", "client/util/removeAttribute", "client/util/setAttribute", "client/util/setTitle", "client/util/vdomMutate/mod", "client/util/vdomRender"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var exportedNames_4 = {
        "createElement": true,
        "createText": true,
        "removeAttribute": true,
        "setAttribute": true,
        "setTitle": true,
        "vdomMutate": true,
        "vdomRender": true
    };
    function exportStar_6(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_4.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_46(exports);
    }
    return {
        setters: [
            function (constants_ts_13_1) {
                exportStar_6(constants_ts_13_1);
            },
            function (createElement_ts_4_1) {
                exports_46({
                    "createElement": createElement_ts_4_1["default"]
                });
            },
            function (createText_ts_3_1) {
                exports_46({
                    "createText": createText_ts_3_1["default"]
                });
            },
            function (removeAttribute_ts_1_1) {
                exports_46({
                    "removeAttribute": removeAttribute_ts_1_1["default"]
                });
            },
            function (setAttribute_ts_1_1) {
                exports_46({
                    "setAttribute": setAttribute_ts_1_1["default"]
                });
            },
            function (setTitle_ts_1_1) {
                exports_46({
                    "setTitle": setTitle_ts_1_1["default"]
                });
            },
            function (mod_ts_10_1) {
                exports_46({
                    "vdomMutate": mod_ts_10_1["default"]
                });
            },
            function (vdomRender_ts_1_1) {
                exports_46({
                    "vdomRender": vdomRender_ts_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("client/util/vdomMutate/routeAttributes", ["client/util/mod", "util/mod"], function (exports_47, context_47) {
    "use strict";
    var mod_ts_11, mod_ts_12;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [
            function (mod_ts_11_1) {
                mod_ts_11 = mod_ts_11_1;
            },
            function (mod_ts_12_1) {
                mod_ts_12 = mod_ts_12_1;
            }
        ],
        execute: function () {
            exports_47("default", mod_ts_12.createRoute({
                [mod_ts_12.DiffKeys.create]: mod_ts_11.setAttribute,
                [mod_ts_12.DiffKeys.remove]: mod_ts_11.removeAttribute,
                [mod_ts_12.DiffKeys.update]: mod_ts_11.setAttribute,
            }));
        }
    };
});
System.register("client/util/vdomMutate/types", [], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("client/util/vdomMutate/routeStyles", ["util/mod"], function (exports_49, context_49) {
    "use strict";
    var mod_ts_13;
    var __moduleName = context_49 && context_49.id;
    function setStyle(element, key, value) {
        element.style[key] = value;
    }
    function removeStyle(element, key) {
        setStyle(element, key, null);
    }
    return {
        setters: [
            function (mod_ts_13_1) {
                mod_ts_13 = mod_ts_13_1;
            }
        ],
        execute: function () {
            exports_49("default", mod_ts_13.createRoute({
                [mod_ts_13.DiffKeys.create]: setStyle,
                [mod_ts_13.DiffKeys.remove]: removeStyle,
                [mod_ts_13.DiffKeys.update]: setStyle,
            }));
        }
    };
});
System.register("client/util/vdomMutate/routeEvents", ["util/mod"], function (exports_50, context_50) {
    "use strict";
    var mod_ts_14;
    var __moduleName = context_50 && context_50.id;
    function createListener(element, eventName, handler) {
        element.addEventListener(eventName, handler);
    }
    function removeListener(element, eventName, handler) {
        element.removeEventListener(eventName, handler);
    }
    return {
        setters: [
            function (mod_ts_14_1) {
                mod_ts_14 = mod_ts_14_1;
            }
        ],
        execute: function () {
            exports_50("default", mod_ts_14.createRoute({
                [mod_ts_14.DiffKeys.create]: createListener,
                [mod_ts_14.DiffKeys.remove]: removeListener,
                [mod_ts_14.DiffKeys.update](element, eventName, handler, previousHandler) {
                    // no-op up in this...
                    // > Get your event handler creation out of my render loop!
                    // >
                    // > - Hans (author)
                    removeListener(element, eventName, previousHandler);
                    createListener(element, eventName, handler);
                }
            }));
        }
    };
});
System.register("client/util/vdomMutate/mod", ["util/mod", "client/util/mod", "client/util/vdomMutate/routeAttributes", "client/util/vdomMutate/routeStyles", "client/util/vdomMutate/routeEvents", "util/vdom/isNode"], function (exports_51, context_51) {
    "use strict";
    var mod_ts_15, mod_ts_16, mod_ts_17, routeAttributes_ts_1, routeStyles_ts_1, routeEvents_ts_1, isNode_ts_3, store;
    var __moduleName = context_51 && context_51.id;
    /**
     * Evluate whether two nodes refer to the same element.
     * @param prev
     * @param next
     */
    function isNodeEqual(prev, next) {
        if ((!prev || !next) || (prev && prev.type) !== (next && next.type)) {
            return false;
        }
        else if (mod_ts_17.isText(prev) && mod_ts_17.isText(next)) {
            return prev.value === next.value;
        }
        else if (mod_ts_17.isElement(prev) && mod_ts_17.isElement(next)) {
            return (prev.namespace === next.namespace &&
                prev.tag === next.tag);
        }
        else if (mod_ts_17.isComponent(prev) && mod_ts_17.isComponent(next)) {
            return prev.component === next.component;
        }
        return false;
    }
    /**
     * Get the attributes of a node if possible otherwise create an empty object.
     * @param abstractNode
     */
    function getProperties(abstractNode) {
        return (abstractNode &&
            mod_ts_17.isElement(abstractNode) &&
            abstractNode.properties) || {};
    }
    /**
     * Get the the children of a node if possible otherwise create an empty array.
     * @param abstractNode
     */
    function getChildren(abstractNode) {
        return (abstractNode &&
            !mod_ts_17.isText(abstractNode) &&
            abstractNode.children)
            ? abstractNode.children
            : [];
    }
    function getNodes(nodes) {
        return isNode_ts_3.default(nodes)
            ? [nodes]
            : nodes;
    }
    /**
     * Recursively walk the abstract dom-tree represented by `next`. At each node
     * compare it to the abstract dom-tree represented by `prev`.
     *
     * @param parent
     * @param next
     * @param prev
     */
    function domTreeMutate(parent, maybeNext, hooks, maybePrev = []) {
        const nextNodes = getNodes(maybeNext);
        const nextNodesLength = nextNodes.length;
        const prevNodes = getNodes(maybePrev);
        const prevNodesLength = prevNodes.length;
        const nodesLength = Math.max(nextNodesLength, prevNodesLength);
        for (let i = 0; i < nodesLength; i += 1) {
            let nextNode = nextNodes[i];
            let prevNode = prevNodes[i];
            if (i < nextNodesLength) {
                // Is this a component?
                if (mod_ts_17.isComponent(nextNode)) {
                    // Get the previous memoized result
                    const prevNodeResult = store.getProp(prevNode, 'node');
                    // Evaluate the component
                    hooks.onInit(nextNode);
                    const nextNodeResult = nextNode.component({
                        ...nextNode.properties,
                        children: nextNode.children,
                    });
                    // Store the evaluated component
                    store.setProp(nextNode, 'node', nextNodeResult);
                    // Recurse
                    domTreeMutate(parent, nextNodeResult, hooks, prevNodeResult);
                }
                else {
                    const prevElement = store.getProp(prevNode, 'element');
                    const nodeIsEqual = isNodeEqual(prevNode, nextNode);
                    let nextElement;
                    // Are the two nodes equal?
                    if (!isNodeEqual(prevNode, nextNode)) {
                        if (mod_ts_17.isText(nextNode)) {
                            // Create a text node
                            nextElement = mod_ts_16.createText(nextNode.value);
                        }
                        else {
                            // Create a namespaced element
                            nextElement = mod_ts_16.createElement(nextNode.namespace, nextNode.tag);
                        }
                        // Memoize the node
                        store.setProp(nextNode, 'element', nextElement);
                        if (prevElement) {
                            parent.replaceChild(nextElement, prevElement);
                        }
                        else {
                            parent.appendChild(nextElement);
                        }
                    }
                    else {
                        nextElement = prevElement;
                        store.setProp(nextNode, 'element', nextElement);
                    }
                    if (mod_ts_17.isElement(nextNode)) {
                        const prevProps = prevNode && nodeIsEqual
                            ? getProperties(prevNode)
                            : {};
                        const prevChildren = prevNode && nodeIsEqual
                            ? getChildren(prevNode)
                            : [];
                        const nextProps = getProperties(nextNode);
                        const nextChildren = getChildren(nextNode);
                        const { style: prevStyles = {}, ...prevAttr } = prevProps;
                        const { style: nextStyles = {}, ...nextAttr } = nextProps;
                        const attrPatches = mod_ts_15.diff(prevAttr, nextAttr);
                        const stylePatches = mod_ts_15.diff(prevStyles, nextStyles);
                        if (attrPatches) {
                            for (let attrPatch of attrPatches) {
                                const { type, key, value } = attrPatch;
                                if (key === '_') {
                                    if (prevElement !== nextElement) {
                                        value(nextElement);
                                    }
                                }
                                else if (key.indexOf('on') === 0) {
                                    const eventName = key.substr(2);
                                    routeEvents_ts_1.default(type, [
                                        nextElement,
                                        eventName,
                                        value,
                                    ]);
                                }
                                else {
                                    if (value) {
                                        routeAttributes_ts_1.default(type, [
                                            nextNode.namespace,
                                            nextElement,
                                            key,
                                            value
                                        ]);
                                    }
                                }
                            }
                        }
                        if (stylePatches) {
                            for (let { type, key, value } of stylePatches) {
                                routeStyles_ts_1.default(type, [
                                    nextElement,
                                    key,
                                    value,
                                ]);
                            }
                        }
                        domTreeMutate(nextElement, nextChildren, hooks, prevChildren);
                    }
                }
            }
            else {
                const prevNode = prevNodes[i];
                const prevElement = store.getProp(prevNode, 'element');
                if (prevElement) {
                    parent.removeChild(prevElement);
                }
            }
        }
        // let prev: AbstractElement | AbstractText | null;
        // let prevElement: Element | Text | null;
        // let next: AbstractElement | AbstractText;
        // let nextElement: Element | Text;
        // prev = memoGet(maybePrev!, 'node');
        // prevElement = memoGet(maybePrev!, 'element');
        // if (isComponent(maybeNext)) {
        //   let nextOrComponent = maybeNext.component({ ...maybeNext.properties, children: maybeNext.children });
        //   hooks.onInit(nextOrComponent);
        //   hooks.onEnter();
        //   while (nextOrComponent.type === NodeKeys.Component) {
        //     nextOrComponent = nextOrComponent.component({ ...nextOrComponent.properties, children: nextOrComponent.children });
        //     hooks.onInit(nextOrComponent);
        //     hooks.onEnter();
        //   }
        //   next = nextOrComponent;
        // } else {
        //   next = maybeNext;
        // }
        // const nodeIsEqual = isNodeEqual(prev, next)
        // memoSet(maybeNext, 'node', next);
        // if (!nodeIsEqual) {
        //   if (isText(next)) {
        //     nextElement = createText(next.value);
        //   } else {
        //     nextElement = createElement(next.namespace, next.tag);
        //   }
        //   memoSet(maybeNext, 'element', nextElement);
        //   if (prevElement) {
        //     parent.replaceChild(nextElement, prevElement);      
        //   } else {
        //     parent.appendChild(nextElement);
        //   }
        // } else if (prevElement !== null) {
        //   nextElement = prevElement;
        //   memoSet(maybeNext, 'element', nextElement);
        // }
        // if (isElement(next)) {
        //   const prevProps: AbstractProperties = prev && nodeIsEqual ? getProperties(prev) : {};
        //   const nextProps: AbstractProperties = getProperties(next);
        //   const prevChildren = prev && nodeIsEqual ? getChildren(prev) : [];
        //   const nextChildren = getChildren(next);
        //   const {
        //     style: prevStyles = {},
        //     ...prevAttr
        //   } = prevProps;
        //   const {
        //     style: nextStyles = {},
        //     ...nextAttr
        //   } = nextProps;
        //   const attrPatches = diff(prevAttr, nextAttr);
        //   const stylePatches = diff(prevStyles, nextStyles);
        //   // console.log('nextProps', nextProps, 'stylePatches': stylePatches);
        //   if (attrPatches) {
        //     for (let attrPatch of attrPatches) {
        //       const { type, key, value } = attrPatch;
        //       if (key.indexOf('on') === 0) {
        //         const eventName = key.substr(2);
        //         routeEvents(
        //           type,
        //           [
        //             nextElement! as Element,
        //             eventName,
        //             value,
        //           ]
        //         );
        //       } else {
        //         if (value) {
        //           routeAttributes(
        //             type,
        //             [
        //               next.namespace,
        //               nextElement! as Element,
        //               key,
        //               value
        //             ],
        //           );
        //         }
        //       }
        //     }
        //   }
        //   if (stylePatches) {
        //     for (let { type, key, value } of stylePatches) {
        //       routeStyles(
        //         type,
        //         [
        //           nextElement! as ElementWithStyle,
        //           key,
        //           value,
        //         ]
        //       )
        //     }
        //   }
        //   const nextChildrenLength = nextChildren.length;
        //   const childrenLength = Math.max(prevChildren.length, nextChildren.length);
        //   for (let i = 0; i < childrenLength; i++) {
        //     const prevChild = prevChildren[i];
        //     if (i < nextChildrenLength && isNodeEqual(next, prev)) {
        //       let nextChild = nextChildren[i];
        //       domTreeMutate(
        //         nextElement! as Element,
        //         nextChild,
        //         hooks,
        //         prevChild,
        //       );
        //     } else if (prevChild) {
        //       const prevChildElement = memoGet(prevChild, 'element');
        //       const prevChildNode = memoGet(prevChild, 'node');
        //       if (prevChildElement && nodeIsEqual) {
        //         nextElement!.removeChild(prevChildElement);
        //       }
        //     }
        //   }
        // }
        // hooks.onNext();
    }
    exports_51("default", domTreeMutate);
    return {
        setters: [
            function (mod_ts_15_1) {
                mod_ts_15 = mod_ts_15_1;
                mod_ts_17 = mod_ts_15_1;
            },
            function (mod_ts_16_1) {
                mod_ts_16 = mod_ts_16_1;
            },
            function (routeAttributes_ts_1_1) {
                routeAttributes_ts_1 = routeAttributes_ts_1_1;
            },
            function (routeStyles_ts_1_1) {
                routeStyles_ts_1 = routeStyles_ts_1_1;
            },
            function (routeEvents_ts_1_1) {
                routeEvents_ts_1 = routeEvents_ts_1_1;
            },
            function (isNode_ts_3_1) {
                isNode_ts_3 = isNode_ts_3_1;
            }
        ],
        execute: function () {
            // This is a top level weak map where references to nodes will be stored.
            store = mod_ts_15.createWeakStore();
        }
    };
});
System.register("client/util/vdomRender", ["client/util/vdomMutate/mod", "util/mod"], function (exports_52, context_52) {
    "use strict";
    var mod_ts_18, mod_ts_19, store;
    var __moduleName = context_52 && context_52.id;
    function createRenderer() {
        let time;
        let isInLoop = false;
        let currentNode = null;
        const states = new WeakMap();
        const hooks = {
            onInit: (node) => {
                if (!store.hasProp(node, 'created')) {
                    store.set(node, {
                        created: performance.now(),
                        states: [],
                        effects: [],
                        stateIndex: 0,
                        effectIndex: 0,
                    });
                }
                else {
                    store.setProp(node, 'stateIndex', 0);
                    store.setProp(node, 'effectIndex', 0);
                }
                currentNode = node;
            },
            onEnter: () => {
            },
            onExit: () => {
            },
            onNext: () => {
                currentNode = null;
            },
        };
        const useEffect = (enterHandler, dependencies) => {
            const node = currentNode;
            const effects = store.getProp(node, 'effects');
            const effectIndex = store.getProp(node, 'effectIndex');
            const effect = effects[effectIndex];
            if (effect) {
                const isEqual = mod_ts_19.isShallowEqual(effect.dependencies, dependencies);
                if (!isEqual) {
                    if (effect.exit) {
                        effect.exit();
                    }
                    effects[effectIndex] = {
                        exit: enterHandler(...dependencies),
                        dependencies,
                    };
                    store.setProp(node, 'effects', effects);
                }
            }
            else {
                effects[effectIndex] = {
                    exit: enterHandler(...dependencies),
                    dependencies,
                };
                store.setProp(node, 'effects', effects);
            }
            store.setProp(node, 'effectIndex', effectIndex + 1);
        };
        const createContext = () => {
            const provider = ({ children, value }) => {
                const [state] = useState(value);
                return children;
            };
        };
        const useTime = () => {
            return store.getProp(currentNode, 'created');
        };
        const useState = (initialValue) => {
            const node = currentNode;
            const states = store.getProp(node, 'states');
            const stateIndex = store.getProp(node, 'stateIndex');
            const lookup = states[stateIndex];
            let value;
            const setState = (val) => {
                states[stateIndex] = val;
            };
            if (lookup === void 0) {
                value = initialValue;
                setState(value);
            }
            else {
                value = lookup;
            }
            store.setProp(node, 'stateIndex', stateIndex + 1);
            return [value, setState];
        };
        function start(container, nextTree) {
            let tree;
            isInLoop = true;
            function renderLoop(now) {
                time = now;
                mod_ts_18.default(container, nextTree, hooks, tree);
                if (isInLoop) {
                    window.requestAnimationFrame(renderLoop);
                }
                tree = nextTree;
            }
            renderLoop(performance.now());
        }
        function stop() {
            isInLoop = false;
        }
        return {
            useEffect,
            useState,
            useTime,
            start,
            stop,
        };
    }
    exports_52("default", createRenderer);
    return {
        setters: [
            function (mod_ts_18_1) {
                mod_ts_18 = mod_ts_18_1;
            },
            function (mod_ts_19_1) {
                mod_ts_19 = mod_ts_19_1;
            }
        ],
        execute: function () {
            store = mod_ts_19.createWeakStore();
        }
    };
});
System.register("client/renderer", ["client/util/vdomRender"], function (exports_53, context_53) {
    "use strict";
    var vdomRender_ts_2, _a, start, stop, useEffect, useState, useTime;
    var __moduleName = context_53 && context_53.id;
    return {
        setters: [
            function (vdomRender_ts_2_1) {
                vdomRender_ts_2 = vdomRender_ts_2_1;
            }
        ],
        execute: function () {
            _a = vdomRender_ts_2.default(), start = _a.start, stop = _a.stop, useEffect = _a.useEffect, useState = _a.useState, useTime = _a.useTime;
            exports_53("start", start);
            exports_53("stop", stop);
            exports_53("useEffect", useEffect);
            exports_53("useState", useState);
            exports_53("useTime", useTime);
        }
    };
});
System.register("client/canvas", ["client/renderer", "util/mod"], function (exports_54, context_54) {
    "use strict";
    var renderer_ts_1, mod_ts_20;
    var __moduleName = context_54 && context_54.id;
    function canvas({ children, setDimensions, }) {
        const [ref, setRef] = renderer_ts_1.useState(null);
        return mod_ts_20.s.svg({
            _: setRef,
            width: ref && ref.clientWidth || 0,
            height: ref && ref.clientHeight || 0,
            style: {
                width: '100%',
                height: '100%',
            }
        }, children);
    }
    exports_54("default", canvas);
    return {
        setters: [
            function (renderer_ts_1_1) {
                renderer_ts_1 = renderer_ts_1_1;
            },
            function (mod_ts_20_1) {
                mod_ts_20 = mod_ts_20_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("client/g", ["util/mod"], function (exports_55, context_55) {
    "use strict";
    var mod_ts_21;
    var __moduleName = context_55 && context_55.id;
    function g({ children, size = [2, 2], origin = [0, 0], position = [0, 0], }) {
        const [width, height] = size;
        const [originX, originY] = origin;
        const [positionX, positionY] = position;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const x = originX - halfWidth + positionX;
        const y = originY - halfHeight + positionY;
        return mod_ts_21.s.g({
            style: {
                width: width,
                height: height,
                x: x,
                y: y,
            },
        }, children);
    }
    exports_55("default", g);
    return {
        setters: [
            function (mod_ts_21_1) {
                mod_ts_21 = mod_ts_21_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("client/main", ["util/mod", "client/renderer", "client/canvas", "client/g"], function (exports_56, context_56) {
    "use strict";
    var mod_ts_22, renderer_ts_2, canvas_ts_1, g_ts_1;
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [
            function (mod_ts_22_1) {
                mod_ts_22 = mod_ts_22_1;
            },
            function (renderer_ts_2_1) {
                renderer_ts_2 = renderer_ts_2_1;
            },
            function (canvas_ts_1_1) {
                canvas_ts_1 = canvas_ts_1_1;
            },
            function (g_ts_1_1) {
                g_ts_1 = g_ts_1_1;
            }
        ],
        execute: function () {
            window.addEventListener('DOMContentLoaded', () => {
                renderer_ts_2.start(document.getElementById('app'), mod_ts_22.c(canvas_ts_1.default, mod_ts_22.c(g_ts_1.default)));
            });
        }
    };
});

__instantiate("client/main", false);
