function addBtn(e, t, n, r, o) {
  var i = dom.El("button");
  if (def(t)) {
    i.className = t;
  }
  if (def(r)) {
    i.title = r;
  }
  if (def(n)) {
    i.innerHTML = "<span>" + n + "</span>";
  }
  if (def(o)) {
    i.onclick = o;
  }
  e.appendChild(i);
  return i;
}
function prEl(e, t, n) {
  var r = dom.El(t);
  e.prepend(r);
  var o = typeof n;
  if (o == "string") {
    r.className = n;
  } else if (o == "object") {
    addAttrs(r, n);
  }
  return r;
}
function addEl(e, t, n) {
  var r = dom.El(t);
  e.appendChild(r);
  var o = typeof n;
  if (o == "string") {
    r.className = n;
  } else if (o == "object") {
    addAttrs(r, n);
  }
  return r;
}
function span(e, t) {
  return "<span class='" + e + "'>" + t + "</span>";
}
function injectProperties(e, t) {
  for (var n in t) {
    if (t.hasOwnProperty(n)) {
      e[n] = t[n];
    }
  }
}
function union(e, t) {
  var n = {};
  for (var r in e) {
    n[r] = e[r];
  }
  for (var r in t) {
    n[r] = t[r];
  }
  return n;
}
function almostEqual(e, t, n) {
  return e == n || (e > n ? n + t > e : e + t > n);
}
function addAttrs(e, t) {
  for (var n in t) {
    if (t.hasOwnProperty(n)) {
      e.setAttribute(n, t[n]);
    }
  }
  return e;
}
function objToStr(e) {
  return e.toString();
}
function clone(e) {
  eui++;
  if (e == null || typeof e != "object") {
    return e;
  }
  var t = e.constructor();
  for (var n in e) {
    if (e.hasOwnProperty(n)) {
      t[n] = clone(e[n]);
    }
  }
  return t;
}
function d(e, t) {
  if (typeof e == "undefined") {
    return t;
  } else {
    return e;
  }
}
function anyStr(e, t) {
  if (typeof e == "string") {
    return e;
  } else if (typeof t == "string") {
    return t;
  } else {
    return null;
  }
}
function aStrArray(e) {
  if (typeof e == "string") {
    return [e];
  } else if (e && e.length) {
    return e;
  } else {
    return [];
  }
}
function rmIdxOf(e, t) {
  index = e.indexOf(t);
  if (index === -1) {
    return null;
  } else {
    return e.splice(index, 1);
  }
}
function isStr(e) {
  return typeof e == "string";
}
function isObj(e) {
  return typeof e == "object";
}
function def(e) {
  return typeof e != "undefined";
}
function ndef(e) {
  return typeof e == "undefined";
}
function pushDef(e, t) {
  return typeof e != "undefined" && (t.push(e), true);
}
function cntUp(e, t) {
  if (ndef(e[t])) {
    e[t] = 1;
  } else {
    e[t]++;
  }
}
function hdef(e, t, n) {
  if (ndef(e[t])) {
    e[t] = [];
  }
  e[t].push(n);
}
function randomSort() {
  return 0.5 - Math.random();
}
function shuffleStr(e, t) {
  var n = "!@#$)~_(%^&.abcdefghijklmnopqrstuvwxyz -0123456789".repeat(e.length / 10 + 1).split("").sort(randomSort);
  var r = "";
  for (var o = 0; o < e.length; o++) {
    r += Math.random() > t ? e[o] : n.shift();
  }
  return r;
}
function randomStr(e) {
  var t = ". abcdefghijklmnopqrstuvwxyz -0123456789".repeat(e).split("").sort(randomSort);
  var n = t.slice(0, e).join("");
  return n;
}
function Seq() {
  this.function_queue = [];
}
function objToMsg(e) {
  return e.toMsg();
}
function guess_gettext_mod(e) {
  typ = e.split("_")[0];
  return {
    decorate: type_decorations[typ]
  };
}
function var_resolve(e) {
  e = e.substring(2, e.length - 2);
  if (var_vars_regexp.test(e)) {
    vars = JSON.parse(e.match(var_vars_regexp));
    e = e.split(",")[0];
  } else if (var_vars_regexpbis.test(e)) {
    b = e.split(".");
    e = b[0];
    vars = [b[1]];
  } else {
    vars = [];
  }
  return _(e, vars, guess_gettext_mod(e));
}
function _(e, t, n) {
  if (!def(e)) {
    return "";
  }
  if (typeof t != "object" || t.length === 0) {
    t = ["", "", "", ""];
  }
  n = d(n, {});
  var r;
  if (e in dialog) {
    r = dialog[e];
  } else {
    if (poe) {
      pogen(e);
    }
    if (!n.or || !(n.or in dialog)) {
      r = e;
      if (t.length > 0) {
        r += " " + t.join(" ");
      }
      return r;
    }
    e = r;
    r = dialog[n.or];
  }
  while (var_regexp.test(r)) {
    r = r.replace(var_regexp, var_resolve);
  }
  r = r.printf(t);
  if (n.decorate) {
    r = n.decorate.printf([r]);
  }
  return r;
}
function Cookie(e, t) {
  this.name = e;
  this.minutes = t;
}
function GameState() {
  this.params = {};
  this.actions = {};
  this.cookie = null;
  this.Event = function (e) {
    state.apply(e.type);
  };
}
function EventTarget() {
  this._listeners = {};
}
function SoundBank(e) {
  this.ldr = 0;
  this.dict = {};
  this.callback = d(e, null);
}
function Music(e) {
  this.current = 0;
  this.currentmusic = null;
  this.soundbank = e;
}
function setAudioLoop(e, t) {
  e._loop = t;
}
function setAudioFade(e, t) {}
function ReturnSequence(e) {
  this.seq = e;
  this.isReturnSequence = true;
  this.idx = 0;
}
function addspace(e) {
  return e + " ";
}
function overide(e) {
  e.preventDefault();
  e.stopPropagation();
}
function no_accents(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function VTerm(e, t) {
  var n = this;
  n.context = t;
  n.charduration = 10;
  n.charfactor = {
    char: 1,
    "\xA0": 8,
    " ": 2,
    "!": 10,
    "?": 10,
    ",": 5,
    ".": 8,
    "\t": 2,
    "\n": 10,
    tag: 10
  };
  n.charhtml = {
    "\xA0": "&nbsp;",
    "\n": "<br>",
    "\t": "&nbsp;&nbsp;"
  };
  n.complete_opts = {
    case: "i",
    fuzzy: no_accents,
    humanized: true
  };
  n.imgs = {};
  n.statkey = {};
  n.history = [];
  n.disabled = {};
  n.waiting_fus = [];
  n.histchecking = false;
  n.histindex = 0;
  n.scrl_lock = false;
  n.cmdoutput = true;
  n.suggestion_selected = null;
  n.container = dom.Id(e);
  n.monitor = addEl(n.container, "div", "monitor");
  n.ghost_monitor = prEl(document.body, "div", "ghost-monitor");
  n.notifications = addEl(document.body, "div", "notifications");
  n.last_notify = Date.now();
  addAttrs(n.ghost_monitor, {
    role: "log",
    "aria-live": "polite"
  });
  n.inputdiv = addEl(addEl(n.container, "div", "input-container"), "div", "input-div");
  n.cmdline = addEl(n.inputdiv, "p", "input");
  n.input = addEl(n.cmdline, "input", {
    size: 80
  });
  var r = addEl(n.cmdline, "div", "belt");
  addAttrs(n.cmdline, {
    role: "log",
    "aria-live": "polite"
  });
  var o = addEl(r, "div", "keys");
  n.suggestions = addEl(r, "div", "suggest");
  addAttrs(n.suggestions, {
    role: "log",
    "aria-live": "polite",
    "aria-relevant": "additions removals"
  });
  n.btn_clear = addBtn(o, "key", "✗", "Ctrl-U", function (e) {
    n.set_line("");
    n.show_suggestions(_getCommands(this.context).map(addspace));
  });
  n.btn_tab = addBtn(o, "key", "↹", "Tab", function (e) {
    n.make_suggestions();
  });
  n.btn_enter = addBtn(o, "key", "↵", "Enter", function (e) {
    n.enterKey();
  });
  n.msg_idx = 0;
  n.soundbank = {};
  n.badge_pic = new Pic("badge.png");
  n.timeout = {
    badge: 3000,
    scrl: 100,
    notification: 4000
  };
  n.behave();
}
function _setUserName(e) {
  if (e.length) {
    user.name = e;
  }
  state.set("usr", user.name);
}
function _setUserAddress(e) {
  if (e.length) {
    user.address = e;
  }
  state.set("adr", user.address);
}
function _addGroup(e) {
  user.groups.push(e);
}
function _hasGroup(e) {
  return user.groups.indexOf(e) > -1;
}
function _expandArgs(e, t) {
  var n;
  var r;
  var o;
  var i;
  var s = [];
  for (var a = 0; a < e.length; a++) {
    if (regexp_str.test(e[a])) {
      s.push(e[a].slice(1, e[a].length - 1));
    } else if (regexp_star.test(e[a])) {
      roomp = t.pathToRoom(e[a]);
      n = roomp[0];
      r = roomp[1];
      i = new RegExp(r.replace(/\./g, "\\.").replace(/\*/g, ".*"));
      if (n && r) {
        o = roomp[2];
        var u = [];
        for (var l = 0; l < n.items.length; l++) {
          if (i.test(n.items[l].toString())) {
            u.push(o + (o.length ? "/" : "") + n.items[l].toString());
          }
        }
        s = s.concat(u.sort());
      } else {
        s.push(e[a]);
      }
    } else {
      s.push(e[a]);
    }
  }
  return s;
}
function _validArgs(e, t, n) {
  return e == "ls" || t.length == 1 && ["man", "cd", "mkdir", "less", "touch", "unzip"].indexOf(e) > -1;
}
function commonprefix(e) {
  var t = e.concat().sort();
  for (var n = t[0], r = t[t.length - 1], o = n.length, i = 0; i < o && n.charAt(i) === r.charAt(i);) {
    i++;
  }
  return n.substring(0, i);
}
function _completeArgs(e, t, n, r, o) {
  var i = n.substring(0, 1) == "~" ? $home : r;
  n = n.replace(/\*/g, ".*");
  var s;
  var a = [];
  var u = e[0];
  var l = [ARGT.cmdname].concat(_getCommandSyntax(u));
  if (_argType(l, t, ARGT.cmdname)) {
    var d = _getUserCommands();
    idx = 0;
    for (var c = 0; c < d.length; c++) {
      if (o(d[c])) {
        a.push(d[c] + (d[c] == n ? " " : ""));
      }
    }
    return a;
  }
  if (_argType(l, t, ARGT.msgid)) {
    return Object.keys(dialog).filter(function (e) {
      return e.match("^" + n);
    }).slice(0, 20);
  }
  var m = n.split("/");
  if (_argType(l, t, ARGT.dir) && m.length == 1 && m[0].length === 0) {
    a.push("..");
  }
  room_num = 0;
  for (; room_num < m.length; room_num++) {
    if (s = i.can_cd(m[room_num])) {
      i = s;
      if (room_num === m.length - 1) {
        ret = [s.name + "/"];
      }
    } else if (room_num == m.length - 1 && (_argType(l, t, ARGT.strictfile) || _argType(l, t, ARGT.file) || _argType(l, t, ARGT.dir))) {
      for (child_num = 0; child_num < i.children.length; child_num++) {
        if (o(i.children[child_num].name, m[room_num])) {
          a.push(i.children[child_num].name + "/");
        }
      }
      if (_argType(l, t, ARGT.strictfile) || _argType(l, t, ARGT.file)) {
        for (item_num = 0; item_num < i.items.length; item_num++) {
          if (o(i.items[item_num].name, m[room_num])) {
            a.push(i.items[item_num].name);
          }
        }
      }
    }
  }
  return a;
}
function _getCommands(e) {
  var t;
  var n = [];
  for (t = 0; t < e.items.length; t++) {
    if (e.items[t].executable) {
      n.push("./" + e.items[t].name);
    }
  }
  return n.concat(_getUserCommands());
}
function _parse_exec(e, t) {
  var n = e.getContext();
  var r = t[0];
  var o = false;
  if (t[0] == "sudo") {
    t.shift();
    r = t[0];
    o = true;
  }
  var i = "";
  var s = n;
  t.push(t.pop().replace(/\/$/, ""));
  var a = _expandArgs(t.slice(1), s);
  var u = null;
  if (r.match(/^(\.\/|\/)/)) {
    var l = s.traversee(r);
    var d = l.item;
    var s = l.room;
    if (d && d.executable) {
      u = function (e, t) {
        return d.exec(e, s, t);
      };
    }
  }
  if (!u && (!!o || !!_hasRightForCommand(r, s))) {
    u = _getCommandFunction(r);
  }
  if (!u) {
    if (r in s.cmd_text) {
      s.fire_event(e, r + "_cmd_text", a, 0);
      i = s.cmd_text[r];
    } else {
      s.fire_event(e, "cmd_not_found", a, 0);
      s.fire_event(e, r + "_cmd_not_found", a, 0);
      i = cmd_done(e, [[s, 0]], _("cmd_not_found", [r, s.name]), "cmd_not_found", a);
    }
    return i;
  }
  var c;
  var m;
  for (var p = 0; p < a.length; p++) {
    c = n.traversee(a[p]);
    m = c.room;
    if (m && !c.item && !o && p === 0 && !_hasRightForCommand(r, m)) {
      return i = r in m.cmd_text ? m.cmd_text[r] : _("cmd_not_found", [r, m.name]);
    }
  }
  function f() {
    if (o) {
      n.sudo = true;
    }
    var t = u(a, e);
    if (t) {
      i = t;
    } else if (r in s.cmd_text) {
      i = s.cmd_text[r];
    }
    n.sudo = false;
    return i;
  }
  if (!o || n.supass) {
    return i = f();
  }
  function h(e, t) {
    var r = "";
    if (e == "IHTFP") {
      n.supass = true;
      r = f();
    } else {
      r = _("room_wrong_password");
    }
    return r;
  }
  e.ask(_("ask_password"), h, {
    cls: "choicebox passinput",
    disappear: function (e) {
      e();
    }
  });
}
function Command(e, t, n) {
  this.fu = n;
  this.syntax = t;
  this.group = e;
}
function _hasRightForCommand(e, t) {
  return !!global_commands_fu[e] && user.groups.indexOf(global_commands_fu[e].group) > -1;
}
function _getUserCommands() {
  return Object.keys(global_commands_fu).filter(_hasRightForCommand);
}
function _argType(e, t, n) {
  return n[0] === e[t][0];
}
function _getCommandFunction(e) {
  return global_commands_fu[e].fu;
}
function _getCommandSyntax(e) {
  return global_commands_fu[e].syntax;
}
function _setupCommand(e, t, n, r) {
  global_commands_fu[e] = new Command(t || e, n, r);
}
function _lnCommand(e, t, n) {
  var r = global_commands_fu[t];
  _setupCommand(e, n || e, r.syntax, r.fu);
}
function global_fire(e) {
  if (global_fireables[e]) {
    while (fun = global_fireables[e].shift()) {
      fun();
    }
  }
}
function global_fire_done() {
  global_fire("done");
}
function cmd_done(e, t, n, r, o) {
  function i() {
    for (var n = 0; n < t.length; n++) {
      t[n][0].fire_event(e, r + "_done", o, t[n][1]);
      global_fire_done();
    }
  }
  return [n, i];
}
function Pic(e, t) {
  this.src = e;
  t = d(t, {});
  this.img_dir = d(t.img_dir, "./img/");
  this.cls = t.cls;
  this.shown_in_ls = d(t.pic_shown_in_ls, true);
  this.shown_as_item = d(t.pic_shown_as_item, false);
  this.image_class = d(t.image_class, "");
  this.index = d(t.index, 0);
  this.children = t.children || {};
}
function PicLayers(e, t, n) {
  this.pic = e;
  this.cont = t;
  this.onload = n;
  this.reverseX = false;
  this.reverseY = false;
  this.image_class = d(e.image_class, "");
  this.othercls = "";
  this.offset = [0, 0];
  this.gravity_coef = 1;
  this.offset_prop = {
    grid: null,
    val: [0, 0],
    unit: ["%", "%"],
    prop: ["left", "bottom"],
    range: [[0, 100], [0, 100]]
  };
}
function PlatformGrid(e, t) {
  var n = (t[0][1] - t[0][0]) / e[0].length;
  var r = (t[1][1] - t[1][0]) / e.length;
  this.matrix = e;
  this.x = n;
  this.y = r;
  this.range = t;
}
function getObjUID(e) {
  cntUp(global_uid, e, 0);
  return e.substr(0, 4) + global_uid[e];
}
function File(e, t, n) {
  n = n || {};
  this.executable = d(n.executable, false);
  this.readable = d(n.readable, true);
  this.writable = d(n.writable, false);
  this.picture = new Pic(t, n);
  this.cmd_event = {};
  this.cmd_text = {};
  this.name = e;
  this.uid = n.uid || getObjUID(n.poid || e);
  this.poprefix = n.poprefix;
  EventTarget.call(this);
}
function Item(e, t, n, r) {
  r = r || {};
  r.poprefix = d(r.poprefix, POPREFIX_ITEM);
  File.call(this, e, n, r);
  this.cmd_text = {
    less: t ? t : _(PO_DEFAULT_ITEM)
  };
  this.room = null;
  if (r.poid) {
    this.setPo(r.poid, r.povars);
  }
}
function People(e, t, n, r) {
  r = r || {};
  r.poprefix = d(r.poprefix, POPREFIX_PEOPLE);
  Item.call(this, e, t, n, r);
  this.people = true;
}
function Room(e, t, n, r) {
  r = r || {};
  r.executable = d(r.executable, true);
  File.call(this, d(e, _(PO_DEFAULT_ROOM, [])), n, r);
  this.parents = [];
  this.previous = this;
  this.children = [];
  this.items = [];
  this.isRoot = true;
  this.intro_text = d(t, _(PO_DEFAULT_ROOM_DESC));
  this.starter_msg = null;
  this.enter_callback = null;
  this.leave_callback = null;
  this.suggestions = [];
}
function newRoom(e, t, n) {
  var r = POPREFIX_ROOM + e;
  var o = new Room(_(r, [], {
    or: PO_DEFAULT_ROOM
  }), _(r + POSUFFIX_DESC, [], {
    or: PO_DEFAULT_ROOM_DESC
  }), t, n);
  o.varname = "$" + e;
  o.poid = r;
  o.picture.setImgClass(o.varname.replace("$", "room-"));
  window[o.varname] = o;
  return o;
}
function enterRoom(e, t) {
  var n = t.getContext();
  if (!!n || !e.hasParent(n)) {
    n.doLeaveCallbackTo(e);
  }
  t.setContext(e);
  state.setCurrentRoom(e);
  if (typeof e.enter_callback == "function") {
    e.enter_callback(e, t);
  }
  return [e.toString(), e.intro_text];
}
function app_loaded() {
  start_game();
}
function getTime() {
  var e = new Date();
  return e.getHours() + "h" + e.getMinutes();
}
function learn(e, t, n) {
  if (typeof t == "string") {
    t = [t];
  }
  if (!n) {
    global_fireables.done.push(function () {
      for (var n = 0; n < t.length; n++) {
        e.badge(_("you_learn", [t[n]]), _("you_learn_desc", [t[n]]));
        e.playSound("learned");
      }
    });
  }
}
function unlock(e, t, n) {
  if (!n) {
    global_fireables.done.push(function () {
      e.playSound("unlocked");
      e.badge(_("you_unlock", [t]), _("you_unlock_desc", [t]));
    });
  }
}
function mesg(e, t, n) {
  if (!t) {
    n = n || {};
    function r() {
      setTimeout(function () {
        vt.show_msg("<div class=\"mesg\">" + _("msg_from", [n.user || "????", n.tty || "???", getTime()]) + "\n" + e + "</div>", {
          direct: true
        });
      }, n.timeout || 0);
    }
    if (n.ondone) {
      global_fireables.done.push(r);
    } else {
      r();
    }
  }
}
function ondone(e) {
  global_fireables.done.push(e);
}
function success(e, t, n) {
  if (!n) {
    global_fireables.done.push(function () {
      e.playSound("success");
      e.badge(_(t + "_success_title"), _(t + "_success_text"));
      var n = t + "_congrat_mesg";
      if (n in dialog) {
        mesg(_(n));
      }
    });
  }
}
function start_game() {
  var e = state.startCookie(cookie_version);
  var t = [_("cookie_yes"), _("cookie_no")];
  if (e) {
    t.unshift(_("cookie_yes_load"));
  }
  function n(t, n) {
    t.muteSound();
    var r = false;
    if (pogencnt > 0) {
      t.show_msg(_("pogen_alert", pogencnt));
    }
    if (n - (e ? 1 : 0) <= 0) {
      state.setCookieDuration(10080);
      if (n == 0) {
        r = state.loadCookie();
      }
    } else {
      state.stopCookie();
    }
    t.clear();
    t.setContext(state.getCurrentRoom());
    if (r) {
      t.unmuteSound();
      t.notification(_("game_loaded"));
      t.show_msg(t.context.getStarterMsg(_("welcome_msg", [user.name]) + "\n"));
      t.enable_input();
    } else {
      t.muteCommandResult();
      music.play("preload");
      var o = new Seq();
      o.then(function (e) {
        t.unmuteSound();
        t.ask(_("prelude_text"), function (e) {
          user.judged = _("user_judged-" + Math.min(5, Math.round(e.length / 20)));
        }, {
          cls: "mystory",
          disappear: function (t) {
            t();
            e();
          }
        });
      });
      o.then(function (e) {
        t.ask(user.judged + "\n" + _("username_prompt"), function (t) {
          _setUserName(t);
          e();
        }, {
          placeholder: user.name,
          cls: "megaprompt",
          disappear: function (e) {
            e();
          },
          wait: 500
        });
      });
      o.then(function (e) {
        t.ask(_("useraddress_prompt"), function (t) {
          _setUserAddress(t);
          e();
        }, {
          placeholder: user.address,
          cls: "megaprompt",
          disappear: function (e) {
            e();
            t.flash(0, 800);
          },
          wait: 500
        });
      });
      o.then(function (e) {
        t.muteSound();
        t.show_loading_element_in_msg(["_", " "], {
          duration: 800,
          finalvalue: " ",
          callback: e
        });
      });
      o.then(function (e) {
        t.show_msg([_("gameintro_text_initrd"), e], {});
      });
      o.then(function (e) {
        loadel = dom.Id("initload");
        t.show_loading_element_in_msg(["/'", "'-", " ,", "- "], {
          el: loadel,
          finalvalue: "<span class='color-ok'>" + _("gameintro_ok") + "</span>",
          duration: 800,
          callback: e
        });
      });
      o.then(function (e) {
        t.show_msg([_("gameintro_text_domainname"), e]);
      });
      o.then(function (e) {
        loadel = dom.Id("domainsetup");
        t.show_loading_element_in_msg(["/'", "'-", " ,", "- "], {
          el: loadel,
          finalvalue: "<span class='color-ok'>" + _("gameintro_ok") + "</span>",
          duration: 800,
          callback: e
        });
      });
      o.then(function (e) {
        t.show_msg([_("gameintro_text_fsck"), e]);
      });
      o.then(function (e) {
        loadel = dom.Id("initfsck");
        t.show_loading_element_in_msg(["/'", "'-", " ,", "- "], {
          el: loadel,
          finalvalue: "<span class='color-pass'>" + _("gameintro_pass") + "</span>",
          duration: 800,
          callback: e
        });
      });
      o.then(function (e) {
        t.show_msg([_("gameintro_text_terminus"), e]);
      });
      o.then(function (e) {
        t.show_msg(_("gamestart_text"));
        t.unmuteSound();
        music.play("story");
        t.enable_input();
        t.auto_shuffle_input_msg(_("press_enter"), 0.9, 0.1, 8, 20, null, 50);
      });
      o.next();
    }
  }
  vt = new VTerm("term");
  vt.soundbank = snd;
  vt.charduration = 20;
  vt.charfactor["\xA0"] = 25;
  vt.disable_input();
  _addGroup("cat");
  _addGroup("dir");
  vt.flash(0, 800);
  vt.epic_img_enter("titlescreen.gif", "epicfromright", 800, function (e) {
    e.show_msg(["version : " + game_version, null]);
    if (TESTING) {
      e.enable_input();
      e.setContext(state.getCurrentRoom());
      do_test();
    } else {
      e.ask_choose(_("cookie"), t, n, {
        direct: true
      });
    }
  });
}
function cat_first_try(e) {
  $home.unsetCmdEvent("less_no_arg");
  mesg(_("cmd_cat_first_try"), e, {
    timeout: 500
  });
}
function cat_second_try(e) {
  $home.unsetCmdEvent("destination_unreachable");
  mesg(_("cmd_cat_second_try"), e, {
    timeout: 1000
  });
}
function shell_dial(e) {
  if (!isStr(shell_txt_id)) {
    if (shell_txt_id == 2) {
      pwddecl.fire_event(vt, "less");
    }
    shelly.setTextIdx(++shell_txt_id % 7);
  }
  state.saveCookie();
}
function mv_sum(e) {
  mv_pr_sum++;
  if (mv_pr_sum == 3) {
    prof.moveTo($academy_practice);
    $spell_casting_academy.removePath($lessons);
    $spell_casting_academy.setEnterCallback(null);
    if (e) {
      $western_forest.removePath($spell_casting_academy);
    } else {
      $spell_casting_academy.setLeaveCallback(function () {
        $western_forest.removePath($spell_casting_academy);
      });
    }
    if (!e) {
      success(vt, "room_spell_casting_academy", e);
      ondone(function () {
        setTimeout(function () {
          snd.play("broken");
        }, 1000);
        setTimeout(function () {
          prof.setTextIdx("quit");
          music.play("warning", {
            loop: true
          });
          mesg(_("leave_academy"), e);
        }, 3000);
      });
    }
  }
  console.log("mv", mv_pr_sum);
}
function poney_dial(e) {
  if (!isStr(poney_txt_id)) {
    poney.setTextIdx(poney_txt_id++);
    if (poney_txt_id == 5) {
      poney.setCmdEvent("less_done", "uptxthint");
    }
  }
}
function poney_dialhint(e) {
  poney.setCmdEvent("less_done", "uptxthint");
  if (vt.statkey.Tab && vt.statkey.Tab != 0) {
    if (_hasGroup("mv")) {
      if (state.applied("mvBoulder")) {
        poney.setTextIdx("help");
      } else {
        poney.setTextIdx("mountain");
      }
    } else {
      poney.setTextIdx("mv");
    }
  } else {
    poney.setTextIdx("tab");
  }
}
function buy_to_vendor(e, t) {
  if (t == 0) {
    if ($market.hasItem("mkdir_cost")) {
      $market.removeItem("mkdir_cost");
      $market.apply("mkdirSold");
      return _("you_buy", [_("item_mkdir_spell")]);
    } else {
      return _("need_money", [_("item_rm_spell")]);
    }
  } else if (t == 1) {
    if ($market.hasItem("rm_cost")) {
      $market.removeItem("rm_cost");
      $market.apply("rmSold");
      return _("you_buy", [_("item_rm_spell")]);
    } else {
      return _("need_money", [_("rm_cost")]);
    }
  } else {
    return undefined;
  }
}
var dialog = {
  pogen_alert: "%s traductions manquent, tape 'pogen' pour télécharger le fichier de traduction avec les nouvelles entrées.",
  prelude_text: "<img src='img/kid_face.png'/>\nLa dernière chose dont je me souviens,\nc'est que j'étais dans la salle informatique.\n\nIl y avait ce fichier qu'il fallait que j'efface à tout prix.\nMais où le trouver ? il y avait des dossiers dans tous les sens.\n\nAu bout d'un moment, j'étais hors de moi.\n\nEt puis, brusquement tous les machines se sont éteintes.\nImpossible d'utiliser les ordinateurs.",
  prelude_tuto: "= Geek Fighter II =\nBattez le super ordinateur avec les flèches, Entrée ↵  et Tab ↹.\nTu peux aussi invoquer des sorts en les écrivant rapidement 'ls', 'cat', ou encore 'cd'.",
  prelude_tab: "Quel beau coup de pied! Tu appuies sur Tab ↹ formidablement bien.",
  prelude_enter: "Quel beau coup de poing! Tu appuies sur Entrée ↵ formidablement bien.",
  prelude_success_cmd: "Quel beau coup !",
  prelude_enemy_kill: "Cet ordi est foutu.",
  prelude_wrong_game: "Tu concentres ton énergie, tu lances ce sort puissant… Où te crois-tu ? Dans un dessin animé ?",
  you_learn: "'%s' appris !",
  you_unlock: "%s en vue !",
  you_learn_desc: "Tu peux maintenant utiliser la commande '%s'",
  you_unlock_desc: "Tu peux maintenant accéder à : '%s'",
  you_success: "Fini '%s' !",
  new_path: "Regarde avec 'ls', tu peux maintenant aller à cet endroit : '%s' !",
  congrat: "Félicitations ! Tu as résolu toutes les énigmes de %s !",
  press_enter: "Appuie sur la touche Entrée ↵",
  press_tab: "Appuie sur la touche Tab ↹",
  cookie: "Afin de conserver ton avancement dans le jeu, il faut manger un cookie.\nVeux-tu activer les cookies ?",
  cookie_yes: "oui (nouveau jeu)",
  cookie_yes_load: "oui (reprendre la partie en cours%s)",
  cookie_no: "non (pas de sauvegarde)",
  yes: "oui",
  no: "non",
  item_none: "Objet",
  item_none_text: "Cet objet n'a rien de particulier.",
  item_intro: "C'est un·e %s.",
  people_none: "Personne",
  people_none_text: "Cette personne ressemble plutôt à un robot.",
  cannot_cast: "Cette commande ne peut pas être utilisée ici.",
  cmd_exit: "Au revoir !",
  gameintro_text_initrd: "Chargement de initrd.img [<div class='inmsg' id='initload'></div>]",
  gameintro_text_domainname: "Configuration du nom de domaine [<div class='inmsg' id='domainsetup'></div>]\n ",
  gameintro_text_fsck: "Vérification du système de fichiers [<div class='inmsg' id='initfsck'></div>]\n ",
  gameintro_ok: "OK",
  gameintro_pass: "passable",
  gameintro_text_terminus: "\xA0\xA0\xA0Bienvenue dans {{room.Terminus}}\n \n ",
  "user_judged-0": "Pourquoi êtes vous silencieux tout d'un coup ?",
  "user_judged-bad": "Alors là. Vous allez prendre cher !",
  "user_judged-lovely": "Oh c'est mignon. Est-ce que vous essayé de me soudoyer ?",
  "user_judged-1": "C'est tout ce que vous avez à dire ?",
  "user_judged-2": "Quoi ? C'est quoi ces manières ?",
  "user_judged-3": "Alors là franchement, on ne me l'avait jamais faite.",
  "user_judged-4": "Vous êtes une personne très turbulente.",
  "user_judged-5": "Vous êtes une personne très très turbulente.",
  username_prompt: "Donnez-moi votre nom :",
  useraddress_prompt: "Où habitez vous ?",
  gamestart_text: ".\xA0.\xA0.\xA0.\xA0.\xA0.\n",
  cmd: "%s",
  room: "%s",
  room_unreachable: "La pièce %s est inatteignable.",
  room_unreadable: "Un brouillard dans la pièce empêche de voir son contenu.",
  people_shell: "Palourde",
  people_shell_text: "<voice grl/>Pour te déplacer, écris '{{cmd.cd}}' suivi d'un chemin et pour voir aux alentours, écris '{{cmd.ls}}'.\nSe déplacer dans un chemin n'est possible que si tu connais le chemin.\nIl te faudra sûrement écrire '{{cmd.ls}}' partout où tu passes.",
  people_shell_text1: "<voice grl/>Savais-tu que lorsque tu appuies sur Tab ↹ , des suggestions apparaissent sous ta ligne de commande ?\nLorsque il n'y a plus qu'un mot qui peut être suggéré, ta ligne de commande (en bas) se remplit toute seule.\nPour constater cela, il suffit de commencer à écrire un mot et de taper sur Tab ↹.",
  people_shell_text2: "<voice grl/>Connais-tu la commande '{{cmd.pwd}}' ?\nSi tu écris cette commande (et que tu valides en appuyant sur la touche Entrée ↵), tu auras des informations sur l'endroit où tu te trouves.",
  people_shell_text3: "<voice grl/>Savais-tu que lorsque tu appuies sur les flèches Haut et Bas, tu peux naviguer dans l'historique ? C'est-à-dire que tu peux réutiliser les commandes que tu viens d'entrer.",
  people_shell_text4: "<voice grl/>Savais-tu que lorsque tu appuies sur les touches Ctrl et U, le texte avant le curseur dans la ligne de commande est effacé ? ",
  people_shell_text5: "<voice grl/>Savais-tu que lorsque tu appuies sur les touches Ctrl et C, tu interromps l'action en cours ?",
  people_shell_text6: "<voice grl/>Sais-tu ce qu'est une expression régulière ? Non ? Par exemple \"Bo*\" est une expression régulière pour \"Bonbon\", mais aussi pour \"Bobine\" et tous les mots commençant par les lettres B o.\n Le caractère * (astérisque) signifie : n'importe quel caractère, autant de fois que possible.",
  people_shell_text0: "<voice grl/>Je n'ai ni yeux ni jambes.\nJe me déplace avec '{{cmd.cd}}'.\nJe vois les routes et obstacles avec '{{cmd.ls}}'.\nJ'examine le contenu avec '{{cmd.cat}}' ou parfois avec un éditeur.\nEt parfois, j'exécute…",
  msg_from: "Message de %s sur %s à %s :",
  very_first_try: ".\xA0.\xA0.\n\nTu m'as l'air de ne pas y voir grand chose dans ce brouillard.\n\nAs-tu un lieu où aller ? \n\n Tu ne sais pas ?\n\nRappelle-toi ces bases si tu ne veux pas tomber dans l'oubli :\n1. En écrivant '{{cmd.cat}}' ( ? ), tu pourras examiner en détail ;\n2. En écrivant '{{cmd.ls}}' (LiSter), tu pourras voir ce qui croise ton chemin ;\n3. En écrivant '{{cmd.cd}}' (Changer de Destination), tu pourras aller ailleurs.",
  a_wish_to_understand_you: "what do you want to do ?",
  cmd_cat_aliases: "detrui\\w*, remov\\*, del\\w*, suppr\\w*",
  cmd_cat_first_try: "J'ai oublié de te dire que {{cmd.cat}} doit être suivi du nom d'une personne ou d'un objet.",
  cmd_cat_second_try: "Tiens ! Là ! Il y a une {{people_shell}}, on pourrait lui demander comment elle a fait pour venir jusqu'ici.\nVous vous connaissez peut-être.\n Tu n'as qu'à écrire '{{cmd.cat}} {{people_shell}}' pour engager cette passionnante discussion.",
  cmd_exit_html: "<p>Terminus a été arrêté.</p><p>Au revoir !</p>",
  cmd_cd: "Tu entres dans %s. %s",
  cmd_cd_failed: "Il n'existe aucun chemin appelé %s. Retourne te coucher.",
  cmd_cd_no_args: "'{{cmd.cd}} ~' pour retourner au point de départ.",
  cmd_cd_no_args_pwd: "'{{cmd.pwd}}' pour savoir où tu es.",
  cmd_cd_flood: "À moins de te dédoubler, tu ne peux pas aller dans plusieurs endroits en même temps.",
  cmd_cd_home: "Tu es de retour à la maison !",
  cmd_cd_no_parent: "Tu ne peux plus rebrousser chemin.",
  cmd_cd_parent: "Tu es entré·e dans %s. %s",
  cmd_cp_copied: "%s vient d'être copié(e) dans %s.",
  cmd_cp_unknown: "Je ne vois aucun objet qui pourrait porter ce nom.",
  tgt_already_exists: "'%s' existe déjà.",
  item_not_exists: "L'objet '%s' n'existe pas.",
  cmd_help_begin: "Tu peux utiliser les commandes suivantes :",
  cmd_less_no_arg: "(Pour que ça fonctionne, {{cmd.cat}} doit être suivi d'un sujet à examiner : un objet ou une personne présente à l'endroit où tu te trouves)",
  cmd_less_missing: "%s n'a pas été trouvé(e).",
  cmd_man_no_query: "Il faut poser une question pour obtenir une réponse. C'est ce que dit le grand manuscrit.",
  cmd_man_not_found: "Il n'y a rien d'écrit dans le grand manuscrit.",
  cmd_not_found: "La commande '%s' est introuvable.",
  cmd_mv_aliases: "d[ée]pl\\w*, boug\\*, mov\\w*, met\\w*",
  cmd_mv_done: "%s a été déplacé(e) vers %s.",
  cmd_mv_name_done: "%s a été renommé(e) %s.",
  cmd_mv_overwrite_done: "%s a été renommé(e) en %s (qui a été écrasé(e)).",
  cmd_mv_flood: "Il est possible de déplacer un objet dans un emplacement en indiquant son chemin.  \nPour cela, utilise 'mv OBJET CHEMIN'.",
  cmd_mv_invalid: "Il faut un objet et un emplacement de destination pour réaliser un déplacement.",
  cmd_mv_fixed: "Ceci ne peut être déplacé.",
  cmd_mv_dest_fixed: "Impossible de mettre ça dans cette pièce.",
  room_not_writable: "Impossible de mettre ça dans cette pièce.",
  permission_denied: "(Permission non accordée)",
  welcome_msg: "Salut '%s' ! Ça va ? \n Tu étais tombé·e dans les pommes. J'étais inquiet.",
  cmd_pwd_aliases: "perd\\w*, los\\*, où\\w*je, lieu",
  cmd_pwd: "Tu te trouves dans '%s'.",
  cmd_rm_aliases: "detrui\\w*, remov\\*, del\\w*, suppr\\w*",
  cmd_rm_done: "Tu viens de supprimer '%s'. Ses données disparaissent devant tes yeux.",
  cmd_rm_failed: "Voilà quelque chose que tu ne peux pas détruire.",
  cmd_rm_invalid: "Tu ne peux supprimer qu'un objet existant sans grande importance pour autrui.",
  cmd_rm_miss: "S'il s'agit d'une chose particulière que tu cherches à supprimer, cela ne suffira pas.",
  cmd_touch_created: "Tu viens de créer : '%s' !",
  cmd_touch_none: "Tu as tenté de créer quelque chose. Mais personne ne sait de quoi il s'agit. Vérifie ta syntaxe.",
  cmd_touch_nothing: "Tu dois indiquer ce que tu cherches à créer pour que cela marche.",
  cmd_unknown: "Tu n'as pas encore appris cette commande.",
  combo: "La combinaison est 'terminus' (sans les guillemets).",
  directions: "Là où tu peux aller (chemins) :\n%s ",
  incorrect_syntax: "La syntaxe est incorrecte. Pour en savoir plus : '{{cmd.man}} %s'",
  invalid_spell: "Cette commande n'existe pas",
  items: "Ici, tu peux interagir avec (objets):\n%s",
  peoples: "Ici, tu peux parler avec :\n%s",
  lock_added: "Tu viens d'ajouter le verrou %s",
  room_empty: "Cette pièce est vide. Il n'y a rien.",
  room_new_created: "Tu viens de créer un nouveau chemin : %s",
  room_wrong_password: "Le mot de passe est erroné. As-tu oublié ton mot de passe ? Non, je blague. Déguerpissez !",
  room_wrong_syntax: "La syntaxe n'est pas valide. Relisez les instructions.",
  room_none: "LieuBanal",
  room_none_text: "C'est un endroit très banal.",
  room_home: "Départ",
  room_home_text: "De retour au point de départ… ",
  room_western_forest: "BoisDesLutins",
  room_western_forest_text: "Tu es entré⋅e dans la forêt des Lutins. Le chemin semble mener à une école.\nUn panneau indique \"Académie des Bots : Grande école de Sorcellerie du Grand Ordinateur. \"",
  room_spell_casting_academy: "AcadémieDesBots",
  room_spell_casting_academy_text: "Le hall d'entrée est bondé. \nL'académie a un plafond très haut, qui rend l'entrée très impressionnante.",
  room_spell_casting_academy_success_title: "Succès 'Déménagement destructeur'",
  room_spell_casting_academy_success_text: "Les énigmes de l'{{room_spell_casting_academy}} sont résolues",
  room_spell_casting_academy_congrat_mesg: "L'{{room_spell_casting_academy}} va être fermée le temps des réparations ! Fais plus attention à l'avenir.",
  item_western_forest_academy_direction: "Panneau",
  item_western_forest_academy_direction_text: "Académie des Bots : Grande école de Sorcellerie du Grand Ordinateur.\nÀ ne pas manquer aujourd'hui : Leçon d'initiation aux commandes !",
  item_western_forest_back_direction: "RentreChezToi",
  item_western_forest_back_direction_text: "À tout moment, si tu veux revenir au point de départ, \nécris juste la commande '{{cmd.cd}} ~' ou '{{cmd.cd}}'. \nSi tu es perdu(e), écris '{{cmd.pwd}}'.",
  item_practice: "Pilier%d",
  item_practice_text: "Il s'agit d'un objet conçu pour l'entrainement",
  room_academy_practice: "SalleDEntrainement",
  room_academy_practice_text: "La pièce est remplie de noobs comme toi et d'élèves pratiquant leurs nouvelles commandes.",
  item_academy_practice: "Note",
  item_academy_practice_text: "Attention : ne pas déplacer les Piliers.",
  room_box: "Boîte",
  room_box_text: "Cette boîte est trop petite pour pouvoir entrer dedans.",
  room_meadow: "Prairie",
  room_meadow_text: "C'est une grande et belle prairie verte. Un majestueux {{people_poney}} s'y trouve. Il a l'air triste et solitaire.",
  people_poney: "Poney",
  people_poney_text: "Pour ne pas lui faire peur, tu restes à distance du poney.\nAprès quelques instants, vous arrivez à communiquer avec quelques hochements de tête.\nFinalement, le poney bascule sa tête vers les {{room_mountain}} à l'est comme s'il te suggérait d'aller dans cette direction.",
  people_poney_text1: ".\xA0.\xA0.",
  people_poney_text2: "Pour ne pas lui faire peur, tu restes à distance du poney.\nTu hoches la tête vers les nuages.\nLe poney te répond par le même signe.",
  people_poney_text3: "Tu restes à distance du poney.\nTu hoches la tête vers le sol.\nLe poney fronce son gros visage.",
  people_poney_text4: "Tu restes à distance du poney.\nTu hoches la tête encore une fois, en dessinant des cercles avec ton nez.\nLe poney s'approche.",
  people_poney_text5: "Tu hoches encore la tête. Le poney accourt vers toi.\n«<voice poney/> Eh ! » <voice char/>dit le poney.«<voice poney/> C'est très gentil de te soucier de moi et j'aimerais bien m'amuser avec toi,\nmais je suis persuadé que tu as mieux à faire ».",
  people_poney_textmountain: "Tu hoches encore la tête. Le poney accourt vers toi.\n«<voice poney/> Eh ! » <voice char/>dit le poney.«<voice poney/> As-tu déjà visité les {{room_mountain}} ? ».",
  people_poney_texttab: "«<voice poney/> Eh ! Savais-tu qu'en appuyant sur la touche 'tab', tu pouvais aller beaucoup plus vite ?»",
  people_poney_textmv: "«<voice poney/> J'ai compris ! Tu es bloqué » <voice char/>dit le poney.«<voice poney/> As-tu essayé de parler à un {{people_professor}} de l'{{room_spell_casting_academy}} ? » .",
  people_poney_texthelp: "«<voice poney/> J'ai compris ! Tu es bloqué » <voice char/>dit le poney.«<voice poney/> Désolé, je ne suis pas en mesure de t'aider.\nmais si tu as déjà lu le {{item_man}} tu dois pouvoir utiliser '{{cmd.help}}' » .",
  room_mountain: "Montagnes",
  room_mountain_text: "Tu parcours un sentier de montagne qui mène à une cave.\nSur ce sentier, tu croises un vieil homme.",
  people_man_sage: "VieilHomme",
  people_man_sage_text: "Tu parles avec le vieil homme.\nIl te salue chaleureusement comme si vous vous connaissiez déjà. \n« Salut toi ! \nTu as l'air jeune et intrépide.\nSi tu as le cœur assez brave, alors ton destin t'attend dans cette cave.\nTu y trouveras un portail qui te mènera au chapitre suivant. »\nLe vieil homme devine l'inquiétude qui trouble tes pensées\net te dit en souriant\n« Tiens, prends ce manuscrit qui t'enseignera comment utiliser tes pouvoirs.»\nLe vieil homme pose le {{item_man}} par terre et s'en va.\n« Au revoir ! Au fait si tu ne te sens pas de taille tape '{{cmd.exit}}'. »",
  item_man: "Manuscrit",
  item_man_text: "Si tu oublies des sorts,\ntape \"help\" et une liste des sorts utilisables apparaîtra .\nSi tu veux connaître les détails d'utilisation d'un sort,\ntape 'man' suivi de la commande.\nPar exemple, si tu veux savoir comment utiliser \"mv\", alors tape : \"man mv\"",
  room_lessons: "Cours",
  room_lessons_text: "Tu entres dans la salle où sont dispensés les cours.\nC'est beaucoup plus calme ici. Il semble que ça a déjà commencé et que ça parle du \"Sort de déplacement.\"",
  people_professor: "Professeur",
  cmd_syntax_lesson: "Syntaxe générale des commandes : Les commandes élémentaires sont de la forme :> {{cmd.commande}} {{item.fichiers_ou_données}}La commande apparaissant en début de ligne est presque toujours le nom d'un programme. Ce programme peut être une commande du système d'exploitation, un logiciel écrit par un utilisateur (souvent en langage C) ou un shell. Quelques rares commandes comme la commande cd (changement de dossier / répertoire) ne peuvent pas être traitées correctement par un logiciel spécifique. Elles sont dans ce cas directement exécutées par l'interpréteur de commandes. Certaines de ces commandes peuvent s'exécuter en tapant au clavier seulement leur nom. Mais la plupart des commandes acceptent des options (un tiret suivi d'une ou plusieurs lettres) qui permettent d'utiliser la commande autrement que dans son mode de fonctionnement par défaut. Enfin, bon nombre de commandes sont suivies d'un ou plusieurs noms de fichier, répertoire ou autre, avec lesquels elles vont travailler. Toutes les informations séparées par des espaces à droite du nom de la commande sont appelées arguments de la ligne de commande.",
  people_professor_text: "Le prof dit un tas de choses qui pour toi ressemblent à du charabia,\nmais tu as réussi à comprendre trois choses :\n1. '{{cmd.mv}}' sert à déplacer des objets \n2. il faut indiquer le nom de l'objet et de la destination ({{cmd.mv}} OBJET CHEMIN) \n3. Ce sort ne marche pas sur tous les objets, mais tu n'as pas réussi à bien comprendre lesquels n'étaient pas déplaçables.",
  people_professor_textquit: "« Oh oh ! C'est pas bon, tu devrais partir. Tout de suite ! Tu peux écrire '{{cmd.cd}} ~'» ",
  leave_academy: "La salle d’entraînement va s'écrouler : fuis !",
  room_cave: "Cave",
  room_cave_text: "Cet endroit est une cave typique : sombre et humide, avec une légère odeur de moisissure.",
  room_dark_corridor: "SombreCorridor",
  room_dark_corridor_text: "Tu traverses le sombre corridor et trouves au bout une petite pièce humide.",
  room_staircase: "Escalier",
  room_staircase_text: "L'escalier de pierre mène à un cul-de-sac confirmé par un panneau.",
  item_dead_end: "Panneau",
  item_dead_end_text: "Voie sans issue",
  room_dank: "Cellier",
  room_dank_text: "Cette pièce est encore plus sombre.",
  item_boulder: "Rocher",
  item_boulder_text: "Il s'agirait plutôt d'une grande pierre roulée.\nTu sens un léger courant d'air passé derrière ce rocher.",
  room_small_hole: "PetitRenfoncement",
  room_small_hole_text: "Il n'y a rien de très plaisant ici.\nC'est étroit, on y voit rien et le sol n'est manifestement pas entretenu.\nL'espace est à peine plus volumineux que le rocher.",
  room_small_hole_cd: "Pas très agréable comme endroit. \nJe veux sortir.",
  room_tunnel: "Tunnel",
  room_tunnel_text: "Pendant que tu traverse le tunnel, \ntu reçois des gouttes d'eau sur la tête.\nTu as remarqué une touffe de poil se déplaçant à ta droite.\nAu bout de tunnel, il y a une porte ouverte.",
  people_rat: "TouffeDePoils",
  people_rat_identified: "Rat",
  people_rat_text: "Tu inspectes avec tes mains la touffe de poils et tu remarques qu'il s'agit d'un rat… De la taille d'un petit chien. Il t'a mordu·e. \nCette expérience ne te fut guère agréable.",
  people_rat_identified_text: "(Oh, pardon, excusez-moi de ma maladresse !)",
  people_rat_identified_text1: "(On peut se tutoyer ?)",
  people_rat_identified_text2: "(Oh, pardon, excuse-moi de ma maladresse !)",
  people_rat_identified_text3: "(Je n'ai rien à t'apprendre et tu souhaites tout de même me parler ?)",
  people_rat_identified_text4: "(Es-tu venu sauver Terminus ?)",
  room_stone_chamber: "ChambreDePierre",
  room_stone_chamber_text: "La pièce entière rayonne d'une lueur verte.\nLa source de cette lumière est un portail magique placé en plein milieu de la pièce.\nC'est sûrement le portail dont parlait le vieil homme.",
  room_portal: "Portail",
  room_portal_text: "Tu as été transporté·e à travers les âges…",
  room_townsquare: "PlaceDuVillage",
  room_townsquare_text: "Tu te trouves sur une place du village, grande et ensoleillée.\nAu centre, il y a une fontaine ornée d'un lamantin en pierre qui souffle l'eau au dessus de son visage.\nL'architecture est très jolie, mais tout le monde semble nerveux.",
  people_citizen1: "Canard",
  people_citizen1_: "Jasper",
  people_citizen1_text: "Tu t'adresses à un des villageois : \"Excusez-moi,\". Il se retourne, surpris.\n\"Quoi ?!… Euh, bonjour ! Bienvenue à Terminus.\"",
  people_citizen1__text: "Hmmm. Des questions ? Vas-y.",
  people_citizen1__text1: "Hmmm. Si tu as besoin d'équipements, je te conseille la {{room_market}} et la {{room_artisanshop}}.",
  people_citizen1__text2: "Hmmm. Si tu as besoin d'informations, je te conseille la {{room_library}}.\\",
  people_citizen2: "VieilHomme",
  people_citizen2_text: "Ce villageois lit le journal quand il remarque que tu le regardes. \n\"As-tu lu ça ?\" s'esclaffe-t-il, secouant la dernière édition du \"Dernier Mot\" devant ton visage.\n\"{{people_darkwizard}} aurait pris le contrôle de l'ouest. Balivernes !\n …savent plus quoi inventer pour éviter les sujets qui fâchent…\" \nmarmonne-t-il, secouant sa tête et retournant à sa lecture.",
  people_citizen3: "VillageoiseEnPleurs",
  people_citizen3_text: "La villageoise pleure et tremble sans pouvoir s'arrêter. \n\"Mon bébé !\" pleure t'elle, \n\"Ils ont enlevé mon bébé ! Je sais que le magicien en est le responsable.\"",
  people_citizen3_text1: "\"Mon bébé… Je vais '{{cmd.pkill}} -9 {{people_darkwizard}}'.\"",
  people_citizen3_text2: "(Tu ne sais pas quoi dire…)",
  people_citizen3_text3: "(Tu as beau réfléchir.\nLa seule chose qui soulagerait cette maman serait de retrouver son enfant.)",
  people_citizen3_text4: "\"Je vais {{cmd.rm}} ces trolls.\"",
  people_citizen3_text5: "\"Mais… qui a le pouvoir de faire ça ? Toi ?\"",
  room_market: "PlaceDuMarché",
  room_market_text: "Les commerces sont alignés formant une longue ligne droite.",
  people_vendor: "Vendeur",
  people_vendor_text: "\" Bonjour !\", le vendeur te sourit de manière déplaisante.\n\" Que souhaites-tu acheter ? \"",
  people_vendor_sell_nothing: "(passer son chemin)",
  people_vendor_sell_rm: "le sort 'rm' qui coûte {{item_rm_cost}}",
  people_vendor_sell_mkdir: "le sort 'mkdir' qui coûte {{item_mkdir_cost}}",
  you_buy: "Tu as acheté %s",
  need_money: "Tu n'as pas de quoi acheter ce sort.",
  unzipped: "Dans le %s, tu as trouvé ces choses : %s",
  item_mkdir_cost: "5000",
  item_rm_cost: "10000",
  people_vendor_rm: "\"Hé ! Ce sort ne marche pas sur tout, tu sais.\nJ'aurais dû le mentionner avant de te le vendre…\"",
  item_cmd_unknown: "Cela ne marche pas.",
  item_rm_spell: "rm",
  item_rm_spell_text: "\"Ah, oui, le sort 'rm',\" le vendeur songe.\n\"Dis juste 'rm' suivi du nom de l'objet ou de la personne\net cela causera sa disparition… pour toujours.\nAs-tu les tripes pour l'utiliser ?\"",
  help_rm: "Faire disparaître définitivement un objet ou une personne.",
  man_rm: "Utilise \"rm\" pour supprimer définitivement un objet.\nIl faut écrire :\nrm OBJET",
  item_backpack: "SacÀDos%s",
  item_backpack_text: "Il y a un sac à dos avec ouverture zippée super classe sur la table sans prix dessus. Sa toile est un peu effilochée mais il semble robuste.\nTu jettes un coup d'œil sur le vendeur mais son attention est ailleurs.\nUne inscription apparaît près de la languette du sac : 'unzip'. ",
  help_unzip: "Récupérer le contenu d'un sac zippé.",
  man_unzip: "Ouvrir un sac zippé et sortir ce qu'il contient.\nIl faut écrire :\nunzip SAC.zip",
  item_backpack_stolen: "Tu viens de voler le sac à dos.\nÉtant donné que tu es fauché, et que tu ne travailles pas pour une odieuse multinationale,\nRichard Stallman devrait être fier de toi.",
  item_mkdir_spell: "mkdir",
  item_mkdir_spell_text: "\"'mkdir' transforme les rêves en réalité. Invoque ce sort suivi du nom qui te convient créera un nouveau chemin.\"",
  help_mkdir: "Créer un nouveau chemin.",
  man_mkdir: "Créer un nouveau chemin.\nUtilise \"mkdir\" pour créer un nouveau chemin à partir du chemin où tu te trouves.\nIl faut écrire :\nmkdir CHEMIN",
  room_library: "Bibliothèque",
  room_library_text: "La bibliothèque est mal éclairée et sent la moisissure.\nPourtant, il y fait bon et la douceur de la moquette verte te met à l'aise.",
  item_itemspellbook: "ToutSurLesSorts",
  item_itemspellbook_text: "Un sort est incarné par un objet ayant des propriétés spéciales.\nTout sort placé dans un des lieux mentionné par le PATH pourra être lancé de n'importe où.\nPour les autres, on peut se placer devant l'objet (disons OBJ) et l'utiliser en tapant \"./OBJ\".",
  item_radspellbook: "SuperLivreDesSortilèges",
  item_radspellbook_text: "La légende parle d'un mot portant un grand pouvoir qui permet de faire toute action.",
  item_romancebook: "RomanceDePoche",
  item_romancebook_text: "Tu retournes le livre de poche et ouvres une page au hasard. \n\"Oh, Horace !\" s'écria Antonia, qui bombait sa poitrine tandis qu'Horace arrachait avec doigté son corset de son armature souple. Horace fit un grognement bestial et saisit avec ses mains puissantes les doigts de sa conquête…\n— tu fermes ce livre sans intérêt et tu le reposes sur l'étagère.",
  item_historybook: "HistoireDeTerminus",
  item_historybook_text: "Ce livre semble intéressant, mais il y a trop de pages et l'écriture est vraiment petite. Voici un extrait :\n \n{{people_darkwizard}} … une vielle légende parle d'un magicien qui divisera le pays…\n…seule une bâtisseuse peut arrêter le mal répandu par {{people_darkwizard}}…\n…seul le pouvoir du \"sudo\" permettra de lui résister…",
  item_nostalgicbook: "NostalgieDuPays",
  item_nostalgicbook_text: "Le livre dit : \"Si tu es nostalgique de ton petit nid douillet,\ninvoque juste 'cd ~' et tu y retourneras instantanément. \nMais rappelle-toi que ce sera plus compliqué de revenir.\"\n\n Plus loin, une histoire intitulée \"Solitude\" raconte qu'une magicienne avec un pull arc-en-ciel et des lunettes roses, pouvait revenir en un instant à son lieu d'origine, quel que soit l'endroit où elle se trouvait.\nAussi, elle pouvait téléporter des objets.\nLa page suivante semble expliquer comment, mais elle a été déchirée.",
  item_vimbook: "VIMproved",
  item_vimbook_text: "Tu ouvres ce livre et découvres une écriture étrange.\nUne intense lumière en jaillit et t'aveugle.\nC'est alors que le livre disparaît.",
  item_chat: "Discussions",
  item_chat_text: "Si tu reçois des messages d'autres personnes. C'est probablement parce que l'instruction '{{cmd.mesg y}}' est présente dans ton profil.\nTu peux vérifier cela avec '{{cmd.cat}} .profil'.\nNormalement, les personnes en question doivent avoir accès à la commande '{{cmd.talk}}' pour t'envoyer des messages.",
  item_lever: "IntrigantLevier",
  item_lever_text: "Ce levier est accolé au mur entre deux étagères.",
  item_lever_exec: "Par curiosité, tu pousses le levier. S'en suit la disparation du panneau qui cachait une {{room_backroom}}.",
  room_backroom: "PièceSecrète",
  room_backroom_text: "Derrière le panneau, tu trouves un bibliothécaire de moyenne taille avec un elfe de petite taille.\n(Les elfes sont habituellement plus grands que les bibliothécaires.)\nTu espères ne pas les déranger.",
  people_grep: "Grep",
  people_grep_text: "L'elfe se tourne vers toi avec un regard aigri.\n\"Greeeeeep,\" dit-il solennellement.\n\"Mes parents m'ont donner un nom stupide... Cependant, retiens-le : il te sera utile.\"\n\"Pour chercher les occurrences d'un terme dans un livre, écris simplement \"{{cmd.grep}}\" suivi du terme et de l'objet en question.\nVa trouver un livre et tape \"grep MOT LIVRE\".",
  people_librarian: "Bibliothécaire",
  people_darkwizard: "Mandi",
  people_darkwizard_pre: "le mage funeste",
  people_librarian_text: "\"(silence) ? Oh, bonjour. Désolé pour le désordre,\n mais je suis très occupé par mes recherches sur {{people_darkwizard_pre}} {{people_darkwizard}}.\nPeux-tu me faire une faveur ? Pourrais-tu me donner toutes les références à {{people_darkwizard}} dans le livre relatant \"{{item_historybook}}\". Mon assistant Grep peux t'aider.\" \nGrep te regarde avec un air mécontent. \"Greeepp.\"\n",
  room_rockypath: "CheminEnPierres",
  room_rockypath_text: "Le chemin mène vers des champs.",
  item_largeboulder: "ÉnormeRocher",
  item_largeboulder_text: "Un énorme rocher bloque le passage.\nIl est bien trop gros pour être déplacé.",
  item_largeboulder_rm: "Le rocher disparait dans un pop.",
  room_artisanshop: "BoutiqueArtisanale",
  room_artisanshop_success_title: "Succès 'Assistanat'",
  room_artisanshop_success_text: "Tu sais maintenant utiliser 'touch' et 'mv'.",
  room_artisanshop_text: "Les murs de la boutique sont couverts d'horloges dont les tic-tac sont légèrement désynchronisés.\nDevant le plan de travail, une femme avec une grosse paire de lunettes brandit un chalumeau avec un enthousiasme inquiétant.",
  item_strangetrinket: "BabiolleÉtrange",
  item_strangetrinket_text: "Ça ressemble à une roche de cristal.",
  item_strangetrinket_rm: "T'a-t-on déjà expliqué que certains objets ont une valeur plus grande pour une personne que pour une autre ?\nOn appelle cela la valeur sentimentale.",
  item_strangetrinket_mv: "Cette babiole a sûrement une grande valeur pour cette femme ! En a-t-elle pour toi ?",
  item_dragon: "Dragon",
  item_dragon_text: "Un dragon de la taille de 2 mètres de long parcours la pièce.\nTu aurais cru qu'il s'agissait d'un vrai dragon s'il n'avait pas une clef servant à remonter son mécanisme sur le dos.",
  item_dragon_rm: "Où est-ce que tu te crois ? Dans « Donjon et Dragons » ?",
  item_dragon_mv: "Cela a dû prendre de nombreuses semaines pour réaliser ce Dragon mécanique.\nN'as-tu donc pas de valeurs ?",
  people_artisan: "Artisane",
  people_artisan_text: "L'Artisane lève ses lunettes et te regarde avec surprise.\n\"Êtes-vous le nouvel assistant ? Vous êtes en retard !\" …\n\"Vous dites que vous n'êtes pas mon assistant ? \nEh bien, cela ne signifie pas que vous ne pouvez pas vous rendre utile.\nJ'ai besoin de rouages, vite ! \n... \nVous ne savez même pas comment fabriquer des rouages ?\nHum. Et vous prétendez être un assistant.\nDites simplement \"{{cmd.touch}}\" suivi du nom de la chose que vous voulez créer. Maintenant, faites-moi un {{item_gear}} ! Vous reviendrez me parler après.\"",
  item_gear: "rouage%s",
  item_gear_artisans_ok: "Ah ! Déjà fini ? J'ai l'impression que tu apprends vite. \nMerci pour ton aide.",
  item_gear_text: "Ceci est un {{item_gear}}",
  item_gear_touch: "Euh… à quoi tu t'attends avec seulement un {{item_gear}} ?\nTu devrais être capable de le copier pourtant…\n*pfffff* T'as vraiment besoin d'entraînement.\n Écris seulement “{{cmd,[\"cp\"]}} [OBJET] [CLONE_DE_OBJET]”.\n[OBJET] est le nom de ce que tu vas copier et [CLONE_DE_OBJET] est le nom de la nouvelle copie.\nCompris ? Alors prouve le moi ! Voici un {{item_gear}}. Il m'en faut 5 autres.\nAppelle-les {{item_gear,[1]}}, {{item_gear,[2]}}, {{item_gear,[3]}}, {{item_gear,[4]}}, et {{item_gear,[5]}}, s'il te plait.",
  room_farm: "Ferme",
  room_farm_text: "Il y avait une ferme ici,\nmais les cultures ont été ravagées.",
  item_earofcorn: "EpisDeMais",
  item_earofcorn_text: "Ce maïs a l'air fané et bien piteux.",
  item_earofcorn_rm: "Pourquoi voudrais-tu détruire la seule nourriture d'une personne affamée ?",
  item_another_earofcorn: "AutreEpisDeMais",
  item_another_earofcorn_text: "Ceci est un autre épi de maïs.",
  corn_farmer_ok: "C'est un miracle ! Merci mon ami. Que l'Admin te bénisse.",
  people_farmer: "Fermier",
  people_farmer_text: "\"Ruiné ! Je suis ruiné ! Regarde ce champs de maïs… il n'en reste presque plus rien !\nLes soldats du {{people_darkwizard}} sont passés ici la semaine dernière… Ils ont tout détruit.\nComment vais-je nourrir mes enfants avec seulement un épi de maïs ?\nAvec au moins un {{item_another_earofcorn}}, je pourrais peut être en garder quelques graines.\"",
  room_clearing: "Clairière",
  room_clearing_text: "C'est une clairière couverte d'herbe avec un homme assis sur un rocher, soupirant…\nDerrière lui, les ruines d'une maison.",
  room_clearing_text2: "C'est une clairière couverte d'herbe avec un homme assis sur un rocher, soupirant…\nDerrière lui, une belle {{room_house}} neuve.",
  room_clearing_cd: "Tu ne peux pas traverser le pont tant que tu n'as pas remplacé la {{item_plank}} manquante.",
  people_cryingman: "HommeEnPleurs",
  people_cryingman_text: "<voice grl>\"Vous ! Vous faites partie des mercenaires du {{people_darkwizard}} ? Je peux la sentir cette capacité étrange que vous avez.\nVous êtes venu·e finir le travail, n'est-ce pas ?\nAllez ! Qu'est-ce que vous attendez ? Faites votre sale boulot, il ne me reste plus rien à perdre.\nIls ont détruit ma {{room_house}} et enlevé mon pauvre enfant.\nMa femme est partie en ville pour trouver de l'aide, mais depuis, elle a disparu.",
  room_house: "Maison",
  room_house_success_title: "Succès 'Architecte hétérotopiste'",
  room_house_success_text: "Tu conçois des espaces à partir de rien pour y abriter nos imaginaires.",
  room_house_text: "Ça ! C'est une {{room_house}}.",
  room_house_cd: "Tu entres dans la {{room_house}} construite de tes mains.",
  room_house_ls: "C'est toi qui l'as faite cette {{room_house}}. Prends quelques instants pour apprécier ton œuvre !",
  room_clearing_less2: "Merci du fond du cœur pour m'avoir construit cette {{room_house}} ! J'en pleure de joie.\nY a t'il beaucoup d'autres personnes comme toi ?\nPeux tu libérer mon enfant ?\nJe les ai vu partir par ce {{room_ominouspath}}.\nDésolé, je t'en demande beaucoup trop, mais tu es mon seul espoir pour retrouver ma famille.",
  room_brokenbridge: "PontCassé",
  room_brokenbridge_text: "Un pont de bois grinçant permet de passer au dessus d'un gouffre.\nMais une {{item_plank}} manque, et le trou est trop grand pour être enjambé.",
  room_brokenbridge_text2: "Le pont de bois grince toujours, mais tu peux maintenant passer de l'autre côté en plaçant la {{item_plank}} sur la partie abimée.",
  item_plank: "Planche",
  item_plank_text: "C'est une {{item_plank}}.",
  room_ominouspath: "CheminInquiétant",
  room_ominouspath_text: "Ce chemin mène vers une cave très sombre. \nC'est un chemin pavé tout à fait ordinaire, et pourtant, passer par ici te fiche la trouille.",
  item_brambles: "RoncesTordues",
  item_brambles_text: "Ce tas de ronces est couvert d'épines ne t'inspirent vraiment pas confiance.\nAprès inspection détaillé, il s'agit en fait de fil barbelé astucieusement camouflé.\nÇa cache quelque chose.",
  item_brambles_mv: "Tu ne peux pas toucher les ronces à cause de ces maudites épines.",
  item_brambles_rm: "Lorsque tu invoques '{{cmd.rm}}' sur le tas de ronces,\nces dernières émettent une lueur d'un bleu très profond.\nEnsuite, ce sont des fumées toxiques s'échappent du tas de ronces.\nAu bout d'un moment, les ronces disparaissent avec le nuage de fumée.",
  room_slide: "Toboggan",
  room_slide_text: "Au bout du long toboggan, tu aperçois une autre pièce.",
  room_slide_cd: "{{people_troll1}} bloque l'accès au toboggan.",
  room_slide_cd2: "C'est juste un toboggan. Tu ne sais pas si tu pourras remonter mais tu sais que tu dois y aller.",
  room_kernel: "FichiersNoyau",
  room_kernel_text: "Les FichiersNoyau contiennent les secrets concernant le cœur du système.",
  ask_password: "Mot de passe :",
  item_certificate: "Certificat",
  item_certificate_alert: "Vous n'avez pas le droit de lire le Certificat.",
  item_certificate_text: "Vous tenez le certificat qui se met à vibrer, briller et étrangement à refroidir, vous gelant les mains.\nVous le lâcher et songer à boire une tisane.",
  room_paradise: "Paradis",
  room_paradise_text: " En entrant vous remarquez que le mur à été gravé de long en large, probablement avec les ongles...\nOn peut difficilement y lire les mots : \n \n Ca y est ! vous avez vraiment ouvert les portes du Paradis en découvrant le mot de passe sudo. \n Vous n'avez peut être pas encore assez d'expérience pour l'utiliser avec discernement, mais je suis sûre que vous apprendrez vite. \n \n Et puis, il y a toutes ces choses qui rendent l'inimaginable possible.\n Comme toute chose intéressante, cela demande du temps et de la persévérance. \n Je suis sûre que vous y arrivez sans difficulté avec l'aide des personnes bienveillantes qui peuplent déjà ce monde.\n \n Félicitations ! Merci pour votre curiosité et votre patience.",
  room_paradise_ls: "Il n'y a vraiment rien d'intéressant au Paradis. \nVous repensez à une boisson chaude ou au moins tiède \net à ce cookie que vous pouvez maintenant manger. \nMalgré l'odeur de transpiration, l'air est respirable et vous en voulez plus. \nVous songez à sortir, à marcher un peu puis à vous assoir confortablement. \nInspirez, pensez au portes que vous pouvez ouvrir, et expirer. \n(GAME OVER)\n",
  gameover: "Bon maintenant, je pense que tu vas t'en aller. C'était sympa de te suivre depuis ma grotte. J'espère qu'on pourra se recroiser.",
  gameover1: "Tu es encore là ? Le jeu est fini tu sais...",
  gameover2: "Ah ... d'accord...",
  gameover3: "Bon comme je t'ai déjà dis 'au revoir', je vais t'ignorer. M'en veux pas, hein.",
  item_sudo_teaser: "Prospectus",
  item_sudo_teaser_text: "Avez vous déjà entendu parler de {{cmd.sudo}} ?\n{{cmd.sudo}} permet de lancer un sort sur n'importe quel objet, même protégé.\nPour cela, tapez votre sort précédé de « sudo ». \nGrâce à {{cmd.sudo}}, vous pourrez faire valoir votre certificat.",
  item_instructions: "Instructions",
  item_instructions_text: "Il y a de nombreux objets entreposés dans la salle PlusDeFichiersNoyau.\nDans l'un d'eux, j'ai caché le mot de passe pour utiliser {{cmd.sudo}} précédé de « password= ».\nVous avez probablement appris à utiliser le sort {{cmd.grep}}. Si ce n'est pas encore le cas, rendez vous à la bibliothèque.\n",
  room_morekernel: "PlusDeFichiersNoyau",
  room_morekernel_text: "Il y a tant de fichiers dans cette salle !",
  item_bigfile: "%s.txt",
  grep_long: "Vous obtenez des centaines de lignes en réponse...",
  item_bigfile_text: "Alice, assise auprès de sa sœur sur le gazon, commençait à s’ennuyer \nde rester là à ne rien faire ; une ou deux fois elle avait jeté les yeux sur \nle livre que lisait sa sœur ; mais quoi ! pas d’images, pas de dialogues ! \n« La belle avance, » pensait Alice, « qu’un livre sans images, sans \ncauseries ! »\xA0\nCe texte contient des millions de mots.\nCela prendrait des heures de tout lire.",
  item_bigfileM_text: "Alice, assise auprès de sa sœur sur le gazon, commençait à s’ennuyer \nde rester là à ne rien faire ; une ou deux fois elle avait jeté les yeux sur \nle livre que lisait sa sœur ; mais quoi ! pas d’images, pas de dialogues ! \n« La belle avance, » pensait Alice, « qu’un livre sans images, sans \ncauseries ! »\xA0\nCe texte contient des millions de mots.\nCela prendrait des heures de tout lire.",
  item_bigfileQ_text: "Alice, assise auprès de sa sœur sur le gazon, commençait à s’ennuyer \nde rester là à ne rien faire ; une ou deux fois elle avait jeté les yeux sur \nle livre que lisait sa sœur ; mais quoi ! pas d’images, pas de dialogues ! \n« La belle avance, » pensait Alice, « qu’un livre sans images, sans \ncauseries ! »\xA0\nCe texte contient des millions de mots.\nCela prendrait des heures de tout lire.",
  item_bigfileS_text: "Alice, assise auprès de sa sœur sur le gazon, commençait à s’ennuyer \nde rester là à ne rien faire ; une ou deux fois elle avait jeté les yeux sur \nle livre que lisait sa sœur ; mais quoi ! pas d’images, pas de dialogues ! \n« La belle avance, » pensait Alice, « qu’un livre sans images, sans \ncauseries ! »\xA0\nCe texte contient des millions de mots.\nCela prendrait des heures de tout lire.",
  item_bigfileT_text: "Alice, assise auprès de sa sœur sur le gazon, commençait à s’ennuyer \nde rester là à ne rien faire ; une ou deux fois elle avait jeté les yeux sur \nle livre que lisait sa sœur ; mais quoi ! pas d’images, pas de dialogues ! \n« La belle avance, » pensait Alice, « qu’un livre sans images, sans \ncauseries ! »\xA0\nCe texte contient des millions de mots.\nCela prendrait des heures de tout lire.",
  room_trollcave: "CaveDesTrolls",
  room_trollcave_text: "La cave est sombre et elle sent… les pieds ?! Ah, d'accord, ce sont probablement les trolls. \nContre le mur du fond, il y a une cage avec un enfant enfermé dedans.",
  people_troll1: "TrollMoche",
  people_troll1_text: "Il a l'air fou, et vraiment très moche.",
  people_troll1_mv: "Le troll semble avoir été surpris, puis il s'en va.\nL'espace d'une demi seconde tu as cru voir un beau jeune homme à la place du troll.",
  people_troll1_rm: "Le troll semble avoir été surpris, puis disparaît.\nTu ignore ce qu'il était et tu n'as déjà comme souvenir de lui qu'un bruit désagréable signifiant le moment ou tu l'as fait disparaître.",
  people_troll1_cp: "Ils se multiplient !",
  people_troll2: "TrollPlusMoche",
  people_troll2_text: "Il a l'air fou et vraiment vraiment moche. \nMais il semble vouloir te dire quelque chose avec des grognements incompréhensibles.",
  people_supertroll: "TrollAbsolumentHideux",
  people_supertroll_text: "Tu ne veux sûrement pas regarder cet individu. Oups, trop tard.",
  people_supertroll_rm: "Le troll émet un rot spectaculaire. Il semble que ça n'ait eu aucun effet.",
  people_supertroll_mv: "Si tu le fais sortir de la grotte, il ira semer la terreur dans le pays.\nIl voudra aussi probablement te manger, lorsque tu lui tournera le dos.",
  room_cage: "Cage",
  room_cage_text: "Il y a un enfant terrifié dans cette cage.",
  room_cage_cd: "Tu ne peux pas te faufiler entre les barreaux de la cage. Et puis, ça va pas la tête ?\nPourquoi voudrais tu aller dans cette cage ?\nCe {{people_supertroll}} pourrait te dépecer comme une clémentine.",
  people_kidnapped: "EnfantKidnapé",
  people_kidnapped_text: "Tu sais que ce n'est pas le moment de penser à cela,\nmais cet enfant tire vraiment une drôle de tête.",
  people_kidnapped_mv: "L'enfant regarde autour de lui, confus, surpris de se trouver hors de la cage.\nTu lui souris et lui dis avec une voix douce : \n<voice char> « Tu devrais rentrer chez toi p'tit gars. » \n<voice girl>\"Quoi ? Pourquoi il faut toujours être un garçon par défaut ? Je suis une fille avec des cheveux courts. En plus, t'as l'air d'une crapule toi.\", <voice char> dit la petite fille juste avant de s'échapper.",
  man_cd: "(Choisis ta destination) Utilise \"cd\" pour explorer le monde. \nIl faut écrire : cd CHEMIN",
  help_cd: "Se déplacer dans un autre chemin.",
  man_mv: "(MouVement). \nUtilise \"mv\" pour déplacer un objet. \nIl faut écrire : mv OBJET LIEU_DE_DESTINATION",
  help_mv: "Déplacer un objet dans un autre chemin.",
  man_ls: "(Regarde autour de toi). \nUtilise \"ls\" pour voir ce qui se trouve dans un chemin donné. \nSoit tu observes là où tu es, soit tu observes un autre chemin.\nIl faut écrire : \n  ls             (pour voir autour de toi) \n-OU- \n  ls CHEMIN      (pour voir là où tu ne peux pas choisir ta destination \"cd\" )",
  help_ls: "Décrire un chemin.",
  man_less: "(Lire, Examiner ou parler).\nUtilise \"less\" pour connaître les secrets liés à un objet.\nIl faut écrire :\n  less ITEM",
  help_less: "Utiliser ou lire un objet, ou bien parler à quelqu'un.",
  help_cat: "{{help_less}}",
  man_cat: "{{help_less}}",
  help_more: "{{help_less}}",
  man_man: "Le Grand Manuscrit contient le savoir indispensable aux sorciers.\nVoici les sorts que je pourrai t'enseigner : cd, ls, rm, mv, exit, help, man, touch, grep, pwd.",
  help_man: "En savoir plus sur un sort.",
  man_help: "Tape \"help\" pour avoir une liste des sorts utilisables.",
  help_help: "Lister les sorts utilisables.",
  man_exit: "(quitter) \nUtilise \"exit\" pour quitter le jeu.",
  help_exit: "Quitter le jeu.",
  "man cp": "(CoPy)\nUtilise \"{{cmd.cp}}\" pour cloner un item. \nIl faut écrire :\n  {{cmd.cp}} ITEM NEWNAME ",
  help_cp: "Copier un objet.",
  man_pwd: "(Te montre là où tu es) \nIl faut écrire : \n  \"{{cmd.pwd}}\" ",
  help_pwd: "Dire où tu es.",
  man_grep: "(gReP : Récupère des parties) \nUtilise \"{{cmd.grep}}\" pour trouver les parties d'un texte qui contiennent le mot magique.\nIl faut écrire : \n  grep MOT_MAGIQUE LÀ_OU_TU_CHERCHE ",
  help_grep: "Chercher quelque chose dans un texte.",
  man_touch: "(Touche) En touchant un objet (même imaginaire), tu le fais (re)naître comme neuf.\nUtilise \"{{cmd.touch}}\" pour créer de nouveaux objets.\nIl faut écrire :\n  touch OBJET",
  help_touch: "Toucher un objet.",
  game_loaded: "Partie restaurée",
  room_kernel_sudo: "room_kernel_sudo",
  Suggestions: "Suggestions",
  cmd_poe_revealed: "(Vous venez d'activer le mode d'édition des traductions.)",
  po_symbol_edit: "(édition - taper Ctrl + Entrée pour valider) ",
  po_symbol_unknown: "(message inconnu)"
};
(function () {
  "use strict";

  function e() {
    this.init();
  }
  e.prototype = {
    init: function () {
      var e = this || t;
      e._counter = 1000;
      e._codecs = {};
      e._howls = [];
      e._muted = false;
      e._volume = 1;
      e._canPlayEvent = "canplaythrough";
      e._navigator = typeof window != "undefined" && window.navigator ? window.navigator : null;
      e.masterGain = null;
      e.noAudio = false;
      e.usingWebAudio = true;
      e.autoSuspend = true;
      e.ctx = null;
      e.mobileAutoEnable = true;
      e._setup();
      return e;
    },
    volume: function (e) {
      var n = this || t;
      e = parseFloat(e);
      if (!n.ctx) {
        l();
      }
      if (typeof e != "undefined" && e >= 0 && e <= 1) {
        n._volume = e;
        if (n._muted) {
          return n;
        }
        if (n.usingWebAudio) {
          n.masterGain.gain.value = e;
        }
        for (var r = 0; r < n._howls.length; r++) {
          if (!n._howls[r]._webAudio) {
            for (var o = n._howls[r]._getSoundIds(), i = 0; i < o.length; i++) {
              var s = n._howls[r]._soundById(o[i]);
              if (s && s._node) {
                s._node.volume = s._volume * e;
              }
            }
          }
        }
        return n;
      }
      return n._volume;
    },
    mute: function (e) {
      var n = this || t;
      if (!n.ctx) {
        l();
      }
      n._muted = e;
      if (n.usingWebAudio) {
        n.masterGain.gain.value = e ? 0 : n._volume;
      }
      for (var r = 0; r < n._howls.length; r++) {
        if (!n._howls[r]._webAudio) {
          for (var o = n._howls[r]._getSoundIds(), i = 0; i < o.length; i++) {
            var s = n._howls[r]._soundById(o[i]);
            if (s && s._node) {
              s._node.muted = !!e || s._muted;
            }
          }
        }
      }
      return n;
    },
    unload: function () {
      var e = this || t;
      for (var n = e._howls.length - 1; n >= 0; n--) {
        e._howls[n].unload();
      }
      if (e.usingWebAudio && e.ctx && typeof e.ctx.close != "undefined") {
        e.ctx.close();
        e.ctx = null;
        l();
      }
      return e;
    },
    codecs: function (e) {
      return (this || t)._codecs[e.replace(/^x-/, "")];
    },
    _setup: function () {
      var e = this || t;
      e.state = e.ctx ? e.ctx.state || "running" : "running";
      e._autoSuspend();
      if (!e.usingWebAudio) {
        if (typeof Audio != "undefined") {
          try {
            var n = new Audio();
            if (typeof n.oncanplaythrough == "undefined") {
              e._canPlayEvent = "canplay";
            }
          } catch (r) {
            e.noAudio = true;
          }
        } else {
          e.noAudio = true;
        }
      }
      try {
        var n = new Audio();
        if (n.muted) {
          e.noAudio = true;
        }
      } catch (r) {}
      if (!e.noAudio) {
        e._setupCodecs();
      }
      return e;
    },
    _setupCodecs: function () {
      var e = this || t;
      var n = null;
      try {
        n = typeof Audio != "undefined" ? new Audio() : null;
      } catch (r) {
        return e;
      }
      if (!n || typeof n.canPlayType != "function") {
        return e;
      }
      var o = n.canPlayType("audio/mpeg;").replace(/^no$/, "");
      var i = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g);
      var s = i && parseInt(i[0].split("/")[1], 10) < 33;
      e._codecs = {
        mp3: !s && (!!o || !!n.canPlayType("audio/mp3;").replace(/^no$/, "")),
        mpeg: !!o,
        opus: !!n.canPlayType("audio/ogg; codecs=\"opus\"").replace(/^no$/, ""),
        ogg: !!n.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
        oga: !!n.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
        wav: !!n.canPlayType("audio/wav; codecs=\"1\"").replace(/^no$/, ""),
        aac: !!n.canPlayType("audio/aac;").replace(/^no$/, ""),
        caf: !!n.canPlayType("audio/x-caf;").replace(/^no$/, ""),
        m4a: !!(n.canPlayType("audio/x-m4a;") || n.canPlayType("audio/m4a;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
        mp4: !!(n.canPlayType("audio/x-mp4;") || n.canPlayType("audio/mp4;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
        weba: !!n.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, ""),
        webm: !!n.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, ""),
        dolby: !!n.canPlayType("audio/mp4; codecs=\"ec-3\"").replace(/^no$/, ""),
        flac: !!(n.canPlayType("audio/x-flac;") || n.canPlayType("audio/flac;")).replace(/^no$/, "")
      };
      return e;
    },
    _enableMobileAudio: function () {
      var e = this || t;
      var n = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent);
      var r = !!("ontouchend" in window) || !!e._navigator && !!(e._navigator.maxTouchPoints > 0) || !!e._navigator && !!(e._navigator.msMaxTouchPoints > 0);
      if (!e._mobileEnabled && e.ctx && (n || r)) {
        e._mobileEnabled = false;
        if (!e._mobileUnloaded && e.ctx.sampleRate !== 44100) {
          e._mobileUnloaded = true;
          e.unload();
        }
        e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
        function o() {
          t._autoResume();
          var n = e.ctx.createBufferSource();
          n.buffer = e._scratchBuffer;
          n.connect(e.ctx.destination);
          if (typeof n.start == "undefined") {
            n.noteOn(0);
          } else {
            n.start(0);
          }
          if (typeof e.ctx.resume == "function") {
            e.ctx.resume();
          }
          n.onended = function () {
            n.disconnect(0);
            e._mobileEnabled = true;
            e.mobileAutoEnable = false;
            document.removeEventListener("touchend", o, true);
          };
        }
        document.addEventListener("touchend", o, true);
        return e;
      }
    },
    _autoSuspend: function () {
      var e = this;
      if (e.autoSuspend && e.ctx && typeof e.ctx.suspend != "undefined" && t.usingWebAudio) {
        for (var n = 0; n < e._howls.length; n++) {
          if (e._howls[n]._webAudio) {
            for (var r = 0; r < e._howls[n]._sounds.length; r++) {
              if (!e._howls[n]._sounds[r]._paused) {
                return e;
              }
            }
          }
        }
        if (e._suspendTimer) {
          clearTimeout(e._suspendTimer);
        }
        e._suspendTimer = setTimeout(function () {
          if (e.autoSuspend) {
            e._suspendTimer = null;
            e.state = "suspending";
            e.ctx.suspend().then(function () {
              e.state = "suspended";
              if (e._resumeAfterSuspend) {
                delete e._resumeAfterSuspend;
                e._autoResume();
              }
            });
          }
        }, 30000);
        return e;
      }
    },
    _autoResume: function () {
      var e = this;
      if (e.ctx && typeof e.ctx.resume != "undefined" && t.usingWebAudio) {
        if (e.state === "running" && e._suspendTimer) {
          clearTimeout(e._suspendTimer);
          e._suspendTimer = null;
        } else if (e.state === "suspended") {
          e.ctx.resume().then(function () {
            e.state = "running";
            for (var t = 0; t < e._howls.length; t++) {
              e._howls[t]._emit("resume");
            }
          });
          if (e._suspendTimer) {
            clearTimeout(e._suspendTimer);
            e._suspendTimer = null;
          }
        } else if (e.state === "suspending") {
          e._resumeAfterSuspend = true;
        }
        return e;
      }
    }
  };
  var t = new e();
  function n(e) {
    var t = this;
    if (e.src && e.src.length !== 0) {
      t.init(e);
      return;
    } else {
      console.error("An array of source files must be passed with any new Howl.");
      return;
    }
  }
  n.prototype = {
    init: function (e) {
      var n = this;
      if (!t.ctx) {
        l();
      }
      n._autoplay = e.autoplay || false;
      n._format = typeof e.format != "string" ? e.format : [e.format];
      n._html5 = e.html5 || false;
      n._muted = e.mute || false;
      n._loop = e.loop || false;
      n._pool = e.pool || 5;
      n._preload = typeof e.preload != "boolean" || e.preload;
      n._rate = e.rate || 1;
      n._sprite = e.sprite || {};
      n._src = typeof e.src != "string" ? e.src : [e.src];
      n._volume = e.volume !== undefined ? e.volume : 1;
      n._xhrWithCredentials = e.xhrWithCredentials || false;
      n._duration = 0;
      n._state = "unloaded";
      n._sounds = [];
      n._endTimers = {};
      n._queue = [];
      n._onend = e.onend ? [{
        fn: e.onend
      }] : [];
      n._onfade = e.onfade ? [{
        fn: e.onfade
      }] : [];
      n._onload = e.onload ? [{
        fn: e.onload
      }] : [];
      n._onloaderror = e.onloaderror ? [{
        fn: e.onloaderror
      }] : [];
      n._onplayerror = e.onplayerror ? [{
        fn: e.onplayerror
      }] : [];
      n._onpause = e.onpause ? [{
        fn: e.onpause
      }] : [];
      n._onplay = e.onplay ? [{
        fn: e.onplay
      }] : [];
      n._onstop = e.onstop ? [{
        fn: e.onstop
      }] : [];
      n._onmute = e.onmute ? [{
        fn: e.onmute
      }] : [];
      n._onvolume = e.onvolume ? [{
        fn: e.onvolume
      }] : [];
      n._onrate = e.onrate ? [{
        fn: e.onrate
      }] : [];
      n._onseek = e.onseek ? [{
        fn: e.onseek
      }] : [];
      n._onresume = [];
      n._webAudio = t.usingWebAudio && !n._html5;
      if (typeof t.ctx != "undefined" && t.ctx && t.mobileAutoEnable) {
        t._enableMobileAudio();
      }
      t._howls.push(n);
      if (n._autoplay) {
        n._queue.push({
          event: "play",
          action: function () {
            n.play();
          }
        });
      }
      if (n._preload) {
        n.load();
      }
      return n;
    },
    load: function () {
      var e = this;
      var n = null;
      if (t.noAudio) {
        e._emit("loaderror", null, "No audio support.");
        return;
      }
      if (typeof e._src == "string") {
        e._src = [e._src];
      }
      for (var o = 0; o < e._src.length; o++) {
        var s;
        var a;
        if (e._format && e._format[o]) {
          s = e._format[o];
        } else {
          a = e._src[o];
          if (typeof a != "string") {
            e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
            continue;
          }
          s = /^data:audio\/([^;,]+);/i.exec(a);
          s ||= /\.([^.]+)$/.exec(a.split("?", 1)[0]);
          s &&= s[1].toLowerCase();
        }
        if (!s) {
          console.warn("No file extension was found. Consider using the \"format\" property or specify an extension.");
        }
        if (s && t.codecs(s)) {
          n = e._src[o];
          break;
        }
      }
      if (n) {
        e._src = n;
        e._state = "loading";
        if (window.location.protocol === "https:" && n.slice(0, 5) === "http:") {
          e._html5 = true;
          e._webAudio = false;
        }
        new r(e);
        if (e._webAudio) {
          i(e);
        }
        return e;
      } else {
        e._emit("loaderror", null, "No codec support for selected audio sources.");
        return;
      }
    },
    play: function (e, n) {
      var r = this;
      var o = null;
      if (typeof e == "number") {
        o = e;
        e = null;
      } else {
        if (typeof e == "string" && r._state === "loaded" && !r._sprite[e]) {
          return null;
        }
        if (typeof e == "undefined") {
          e = "__default";
          var i = 0;
          for (var s = 0; s < r._sounds.length; s++) {
            if (r._sounds[s]._paused && !r._sounds[s]._ended) {
              i++;
              o = r._sounds[s]._id;
            }
          }
          if (i === 1) {
            e = null;
          } else {
            o = null;
          }
        }
      }
      var a = o ? r._soundById(o) : r._inactiveSound();
      if (!a) {
        return null;
      }
      if (o && !e) {
        e = a._sprite || "__default";
      }
      if (r._state !== "loaded") {
        a._sprite = e;
        a._ended = false;
        var u = a._id;
        r._queue.push({
          event: "play",
          action: function () {
            r.play(u);
          }
        });
        return u;
      }
      if (o && !a._paused) {
        if (!n) {
          setTimeout(function () {
            r._emit("play", a._id);
          }, 0);
        }
        return a._id;
      }
      if (r._webAudio) {
        t._autoResume();
      }
      var l = Math.max(0, a._seek > 0 ? a._seek : r._sprite[e][0] / 1000);
      var d = Math.max(0, (r._sprite[e][0] + r._sprite[e][1]) / 1000 - l);
      var c = d * 1000 / Math.abs(a._rate);
      a._paused = false;
      a._ended = false;
      a._sprite = e;
      a._seek = l;
      a._start = r._sprite[e][0] / 1000;
      a._stop = (r._sprite[e][0] + r._sprite[e][1]) / 1000;
      a._loop = !!a._loop || !!r._sprite[e][2];
      var m = a._node;
      if (r._webAudio) {
        function _() {
          r._refreshBuffer(a);
          var e = a._muted || r._muted ? 0 : a._volume;
          m.gain.setValueAtTime(e, t.ctx.currentTime);
          a._playStart = t.ctx.currentTime;
          if (typeof m.bufferSource.start == "undefined") {
            if (a._loop) {
              m.bufferSource.noteGrainOn(0, l, 86400);
            } else {
              m.bufferSource.noteGrainOn(0, l, d);
            }
          } else if (a._loop) {
            m.bufferSource.start(0, l, 86400);
          } else {
            m.bufferSource.start(0, l, d);
          }
          if (c !== Infinity) {
            r._endTimers[a._id] = setTimeout(r._ended.bind(r, a), c);
          }
          if (!n) {
            setTimeout(function () {
              r._emit("play", a._id);
            }, 0);
          }
        }
        if (t.state === "running") {
          _();
        } else {
          r.once("resume", _);
          r._clearTimer(a._id);
        }
      } else {
        function p() {
          m.currentTime = l;
          m.muted = a._muted || r._muted || t._muted || m.muted;
          m.volume = a._volume * t.volume();
          m.playbackRate = a._rate;
          try {
            m.play();
            if (m.paused) {
              r._emit("playerror", a._id, "Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.");
              return;
            }
            if (c !== Infinity) {
              r._endTimers[a._id] = setTimeout(r._ended.bind(r, a), c);
            }
            if (!n) {
              r._emit("play", a._id);
            }
          } catch (e) {
            r._emit("playerror", a._id, e);
          }
        }
        var f = window && window.ejecta || !m.readyState && t._navigator.isCocoonJS;
        if (m.readyState === 4 || f) {
          p();
        } else {
          function h() {
            p();
            m.removeEventListener(t._canPlayEvent, h, false);
          }
          m.addEventListener(t._canPlayEvent, h, false);
          r._clearTimer(a._id);
        }
      }
      return a._id;
    },
    pause: function (e) {
      var t = this;
      if (t._state !== "loaded") {
        t._queue.push({
          event: "pause",
          action: function () {
            t.pause(e);
          }
        });
        return t;
      }
      for (var n = t._getSoundIds(e), r = 0; r < n.length; r++) {
        t._clearTimer(n[r]);
        var o = t._soundById(n[r]);
        if (o && !o._paused && (o._seek = t.seek(n[r]), o._rateSeek = 0, o._paused = true, t._stopFade(n[r]), o._node)) {
          if (t._webAudio) {
            if (!o._node.bufferSource) {
              continue;
            }
            if (typeof o._node.bufferSource.stop == "undefined") {
              o._node.bufferSource.noteOff(0);
            } else {
              o._node.bufferSource.stop(0);
            }
            t._cleanBuffer(o._node);
          } else if (!isNaN(o._node.duration) || o._node.duration === Infinity) {
            o._node.pause();
          }
        }
        if (!arguments[1]) {
          t._emit("pause", o ? o._id : null);
        }
      }
      return t;
    },
    stop: function (e, t) {
      var n = this;
      if (n._state !== "loaded") {
        n._queue.push({
          event: "stop",
          action: function () {
            n.stop(e);
          }
        });
        return n;
      }
      for (var r = n._getSoundIds(e), o = 0; o < r.length; o++) {
        n._clearTimer(r[o]);
        var i = n._soundById(r[o]);
        if (i) {
          i._seek = i._start || 0;
          i._rateSeek = 0;
          i._paused = true;
          i._ended = true;
          n._stopFade(r[o]);
          if (i._node) {
            if (n._webAudio) {
              if (i._node.bufferSource) {
                if (typeof i._node.bufferSource.stop == "undefined") {
                  i._node.bufferSource.noteOff(0);
                } else {
                  i._node.bufferSource.stop(0);
                }
                n._cleanBuffer(i._node);
              }
            } else if (!isNaN(i._node.duration) || i._node.duration === Infinity) {
              i._node.currentTime = i._start || 0;
              i._node.pause();
            }
          }
          if (!t) {
            n._emit("stop", i._id);
          }
        }
      }
      return n;
    },
    mute: function (e, n) {
      var r = this;
      if (r._state !== "loaded") {
        r._queue.push({
          event: "mute",
          action: function () {
            r.mute(e, n);
          }
        });
        return r;
      }
      if (typeof n == "undefined") {
        if (typeof e != "boolean") {
          return r._muted;
        }
        r._muted = e;
      }
      for (var o = r._getSoundIds(n), i = 0; i < o.length; i++) {
        var s = r._soundById(o[i]);
        if (s) {
          s._muted = e;
          if (r._webAudio && s._node) {
            s._node.gain.setValueAtTime(e ? 0 : s._volume, t.ctx.currentTime);
          } else if (s._node) {
            s._node.muted = !!t._muted || e;
          }
          r._emit("mute", s._id);
        }
      }
      return r;
    },
    volume: function () {
      var e;
      var n;
      var r = this;
      var o = arguments;
      if (o.length === 0) {
        return r._volume;
      }
      if (o.length === 1 || o.length === 2 && typeof o[1] == "undefined") {
        var i = r._getSoundIds();
        var s = i.indexOf(o[0]);
        if (s >= 0) {
          n = parseInt(o[0], 10);
        } else {
          e = parseFloat(o[0]);
        }
      } else if (o.length >= 2) {
        e = parseFloat(o[0]);
        n = parseInt(o[1], 10);
      }
      var a;
      if (typeof e == "undefined" || !(e >= 0) || !(e <= 1)) {
        a = n ? r._soundById(n) : r._sounds[0];
        if (a) {
          return a._volume;
        } else {
          return 0;
        }
      }
      if (r._state !== "loaded") {
        r._queue.push({
          event: "volume",
          action: function () {
            r.volume.apply(r, o);
          }
        });
        return r;
      }
      if (typeof n == "undefined") {
        r._volume = e;
      }
      n = r._getSoundIds(n);
      for (var u = 0; u < n.length; u++) {
        a = r._soundById(n[u]);
        if (a) {
          a._volume = e;
          if (!o[2]) {
            r._stopFade(n[u]);
          }
          if (r._webAudio && a._node && !a._muted) {
            a._node.gain.setValueAtTime(e, t.ctx.currentTime);
          } else if (a._node && !a._muted) {
            a._node.volume = e * t.volume();
          }
          r._emit("volume", a._id);
        }
      }
      return r;
    },
    fade: function (e, n, r, o) {
      var i = this;
      if (i._state !== "loaded") {
        i._queue.push({
          event: "fade",
          action: function () {
            i.fade(e, n, r, o);
          }
        });
        return i;
      }
      i.volume(e, o);
      for (var s = i._getSoundIds(o), a = 0; a < s.length; a++) {
        var u = i._soundById(s[a]);
        if (u) {
          if (!o) {
            i._stopFade(s[a]);
          }
          if (i._webAudio && !u._muted) {
            var l = t.ctx.currentTime;
            var d = l + r / 1000;
            u._volume = e;
            u._node.gain.setValueAtTime(e, l);
            u._node.gain.linearRampToValueAtTime(n, d);
          }
          i._startFadeInterval(u, e, n, r);
        }
      }
      return i;
    },
    _startFadeInterval: function (e, t, n, r) {
      var o = this;
      var i = t;
      var s = t > n ? "out" : "in";
      var a = Math.abs(t - n);
      var u = a / 0.01;
      var l = u > 0 ? r / u : r;
      if (l < 4) {
        u = Math.ceil(u / (4 / l));
        l = 4;
      }
      e._interval = setInterval(function () {
        if (u > 0) {
          i += s === "in" ? 0.01 : -0.01;
        }
        i = Math.max(0, i);
        i = Math.min(1, i);
        i = Math.round(i * 100) / 100;
        if (o._webAudio) {
          if (typeof id == "undefined") {
            o._volume = i;
          }
          e._volume = i;
        } else {
          o.volume(i, e._id, true);
        }
        if (n < t && i <= n || n > t && i >= n) {
          clearInterval(e._interval);
          e._interval = null;
          o.volume(n, e._id);
          o._emit("fade", e._id);
        }
      }, l);
    },
    _stopFade: function (e) {
      var n = this;
      var r = n._soundById(e);
      if (r && r._interval) {
        if (n._webAudio) {
          r._node.gain.cancelScheduledValues(t.ctx.currentTime);
        }
        clearInterval(r._interval);
        r._interval = null;
        n._emit("fade", e);
      }
      return n;
    },
    loop: function () {
      var e;
      var t;
      var n;
      var r = this;
      var o = arguments;
      if (o.length === 0) {
        return r._loop;
      }
      if (o.length === 1) {
        if (typeof o[0] != "boolean") {
          n = r._soundById(parseInt(o[0], 10));
          return !!n && n._loop;
        }
        e = o[0];
        r._loop = e;
      } else if (o.length === 2) {
        e = o[0];
        t = parseInt(o[1], 10);
      }
      for (var i = r._getSoundIds(t), s = 0; s < i.length; s++) {
        n = r._soundById(i[s]);
        if (n) {
          n._loop = e;
          if (r._webAudio && n._node && n._node.bufferSource) {
            n._node.bufferSource.loop = e;
            if (e) {
              n._node.bufferSource.loopStart = n._start || 0;
              n._node.bufferSource.loopEnd = n._stop;
            }
          }
        }
      }
      return r;
    },
    rate: function () {
      var e;
      var n;
      var r = this;
      var o = arguments;
      if (o.length === 0) {
        n = r._sounds[0]._id;
      } else if (o.length === 1) {
        var i = r._getSoundIds();
        var s = i.indexOf(o[0]);
        if (s >= 0) {
          n = parseInt(o[0], 10);
        } else {
          e = parseFloat(o[0]);
        }
      } else if (o.length === 2) {
        e = parseFloat(o[0]);
        n = parseInt(o[1], 10);
      }
      var a;
      if (typeof e != "number") {
        a = r._soundById(n);
        if (a) {
          return a._rate;
        } else {
          return r._rate;
        }
      }
      if (r._state !== "loaded") {
        r._queue.push({
          event: "rate",
          action: function () {
            r.rate.apply(r, o);
          }
        });
        return r;
      }
      if (typeof n == "undefined") {
        r._rate = e;
      }
      n = r._getSoundIds(n);
      for (var u = 0; u < n.length; u++) {
        if (a = r._soundById(n[u])) {
          a._rateSeek = r.seek(n[u]);
          a._playStart = r._webAudio ? t.ctx.currentTime : a._playStart;
          a._rate = e;
          if (r._webAudio && a._node && a._node.bufferSource) {
            a._node.bufferSource.playbackRate.value = e;
          } else if (a._node) {
            a._node.playbackRate = e;
          }
          var l = r.seek(n[u]);
          var d = (r._sprite[a._sprite][0] + r._sprite[a._sprite][1]) / 1000 - l;
          var c = d * 1000 / Math.abs(a._rate);
          if (!!r._endTimers[n[u]] || !a._paused) {
            r._clearTimer(n[u]);
            r._endTimers[n[u]] = setTimeout(r._ended.bind(r, a), c);
          }
          r._emit("rate", a._id);
        }
      }
      return r;
    },
    seek: function () {
      var e;
      var n;
      var r = this;
      var o = arguments;
      if (o.length === 0) {
        n = r._sounds[0]._id;
      } else if (o.length === 1) {
        var i = r._getSoundIds();
        var s = i.indexOf(o[0]);
        if (s >= 0) {
          n = parseInt(o[0], 10);
        } else if (r._sounds.length) {
          n = r._sounds[0]._id;
          e = parseFloat(o[0]);
        }
      } else if (o.length === 2) {
        e = parseFloat(o[0]);
        n = parseInt(o[1], 10);
      }
      if (typeof n == "undefined") {
        return r;
      }
      if (r._state !== "loaded") {
        r._queue.push({
          event: "seek",
          action: function () {
            r.seek.apply(r, o);
          }
        });
        return r;
      }
      var a = r._soundById(n);
      if (a) {
        if (typeof e != "number" || !(e >= 0)) {
          if (r._webAudio) {
            var u = r.playing(n) ? t.ctx.currentTime - a._playStart : 0;
            var l = a._rateSeek ? a._rateSeek - a._seek : 0;
            return a._seek + (l + u * Math.abs(a._rate));
          }
          return a._node.currentTime;
        }
        var d = r.playing(n);
        if (d) {
          r.pause(n, true);
        }
        a._seek = e;
        a._ended = false;
        r._clearTimer(n);
        if (d) {
          r.play(n, true);
        }
        if (!r._webAudio && a._node) {
          a._node.currentTime = e;
        }
        r._emit("seek", n);
      }
      return r;
    },
    playing: function (e) {
      var t = this;
      if (typeof e == "number") {
        var n = t._soundById(e);
        return !!n && !n._paused;
      }
      for (var r = 0; r < t._sounds.length; r++) {
        if (!t._sounds[r]._paused) {
          return true;
        }
      }
      return false;
    },
    duration: function (e) {
      var t = this;
      var n = t._duration;
      var r = t._soundById(e);
      if (r) {
        n = t._sprite[r._sprite][1] / 1000;
      }
      return n;
    },
    state: function () {
      return this._state;
    },
    unload: function () {
      var e = this;
      for (var n = e._sounds, r = 0; r < n.length; r++) {
        if (!n[r]._paused) {
          e.stop(n[r]._id);
        }
        if (!e._webAudio) {
          var i = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
          if (!i) {
            n[r]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
          }
          n[r]._node.removeEventListener("error", n[r]._errorFn, false);
          n[r]._node.removeEventListener(t._canPlayEvent, n[r]._loadFn, false);
        }
        delete n[r]._node;
        e._clearTimer(n[r]._id);
        var s = t._howls.indexOf(e);
        if (s >= 0) {
          t._howls.splice(s, 1);
        }
      }
      var a = true;
      for (r = 0; r < t._howls.length; r++) {
        if (t._howls[r]._src === e._src) {
          a = false;
          break;
        }
      }
      if (o && a) {
        delete o[e._src];
      }
      t.noAudio = false;
      e._state = "unloaded";
      e._sounds = [];
      e = null;
      return null;
    },
    on: function (e, t, n, r) {
      var o = this;
      var i = o["_on" + e];
      if (typeof t == "function") {
        i.push(r ? {
          id: n,
          fn: t,
          once: r
        } : {
          id: n,
          fn: t
        });
      }
      return o;
    },
    off: function (e, t, n) {
      var r = this;
      var o = r["_on" + e];
      var i = 0;
      if (typeof t == "number") {
        n = t;
        t = null;
      }
      if (t || n) {
        for (i = 0; i < o.length; i++) {
          var s = n === o[i].id;
          if (t === o[i].fn && s || !t && s) {
            o.splice(i, 1);
            break;
          }
        }
      } else if (e) {
        r["_on" + e] = [];
      } else {
        var a = Object.keys(r);
        for (i = 0; i < a.length; i++) {
          if (a[i].indexOf("_on") === 0 && Array.isArray(r[a[i]])) {
            r[a[i]] = [];
          }
        }
      }
      return r;
    },
    once: function (e, t, n) {
      var r = this;
      r.on(e, t, n, 1);
      return r;
    },
    _emit: function (e, t, n) {
      var r = this;
      var o = r["_on" + e];
      for (var i = o.length - 1; i >= 0; i--) {
        if (!o[i].id || o[i].id === t || e === "load") {
          setTimeout(function (e) {
            e.call(this, t, n);
          }.bind(r, o[i].fn), 0);
          if (o[i].once) {
            r.off(e, o[i].fn, o[i].id);
          }
        }
      }
      return r;
    },
    _loadQueue: function () {
      var e = this;
      if (e._queue.length > 0) {
        var t = e._queue[0];
        e.once(t.event, function () {
          e._queue.shift();
          e._loadQueue();
        });
        t.action();
      }
      return e;
    },
    _ended: function (e) {
      var n = this;
      var r = e._sprite;
      if (!n._webAudio && n._node && !n._node.ended) {
        setTimeout(n._ended.bind(n, e), 100);
        return n;
      }
      var o = !!e._loop || !!n._sprite[r][2];
      n._emit("end", e._id);
      if (!n._webAudio && o) {
        n.stop(e._id, true).play(e._id);
      }
      if (n._webAudio && o) {
        n._emit("play", e._id);
        e._seek = e._start || 0;
        e._rateSeek = 0;
        e._playStart = t.ctx.currentTime;
        var i = (e._stop - e._start) * 1000 / Math.abs(e._rate);
        n._endTimers[e._id] = setTimeout(n._ended.bind(n, e), i);
      }
      if (n._webAudio && !o) {
        e._paused = true;
        e._ended = true;
        e._seek = e._start || 0;
        e._rateSeek = 0;
        n._clearTimer(e._id);
        n._cleanBuffer(e._node);
        t._autoSuspend();
      }
      if (!n._webAudio && !o) {
        n.stop(e._id);
      }
      return n;
    },
    _clearTimer: function (e) {
      var t = this;
      if (t._endTimers[e]) {
        clearTimeout(t._endTimers[e]);
        delete t._endTimers[e];
      }
      return t;
    },
    _soundById: function (e) {
      for (var t = this, n = 0; n < t._sounds.length; n++) {
        if (e === t._sounds[n]._id) {
          return t._sounds[n];
        }
      }
      return null;
    },
    _inactiveSound: function () {
      var e = this;
      e._drain();
      for (var t = 0; t < e._sounds.length; t++) {
        if (e._sounds[t]._ended) {
          return e._sounds[t].reset();
        }
      }
      return new r(e);
    },
    _drain: function () {
      var e = this;
      var t = e._pool;
      var n = 0;
      var r = 0;
      if (!(e._sounds.length < t)) {
        for (r = 0; r < e._sounds.length; r++) {
          if (e._sounds[r]._ended) {
            n++;
          }
        }
        for (r = e._sounds.length - 1; r >= 0; r--) {
          if (n <= t) {
            return;
          }
          if (e._sounds[r]._ended) {
            if (e._webAudio && e._sounds[r]._node) {
              e._sounds[r]._node.disconnect(0);
            }
            e._sounds.splice(r, 1);
            n--;
          }
        }
      }
    },
    _getSoundIds: function (e) {
      var t = this;
      if (typeof e == "undefined") {
        var n = [];
        for (var r = 0; r < t._sounds.length; r++) {
          n.push(t._sounds[r]._id);
        }
        return n;
      }
      return [e];
    },
    _refreshBuffer: function (e) {
      var n = this;
      e._node.bufferSource = t.ctx.createBufferSource();
      e._node.bufferSource.buffer = o[n._src];
      if (e._panner) {
        e._node.bufferSource.connect(e._panner);
      } else {
        e._node.bufferSource.connect(e._node);
      }
      e._node.bufferSource.loop = e._loop;
      if (e._loop) {
        e._node.bufferSource.loopStart = e._start || 0;
        e._node.bufferSource.loopEnd = e._stop;
      }
      e._node.bufferSource.playbackRate.value = e._rate;
      return n;
    },
    _cleanBuffer: function (e) {
      var t = this;
      if (t._scratchBuffer) {
        e.bufferSource.onended = null;
        e.bufferSource.disconnect(0);
        try {
          e.bufferSource.buffer = t._scratchBuffer;
        } catch (n) {}
      }
      e.bufferSource = null;
      return t;
    }
  };
  function r(e) {
    this._parent = e;
    this.init();
  }
  r.prototype = {
    init: function () {
      var e = this;
      var n = e._parent;
      e._muted = n._muted;
      e._loop = n._loop;
      e._volume = n._volume;
      e._rate = n._rate;
      e._seek = 0;
      e._paused = true;
      e._ended = true;
      e._sprite = "__default";
      e._id = ++t._counter;
      n._sounds.push(e);
      e.create();
      return e;
    },
    create: function () {
      var e = this;
      var n = e._parent;
      var r = t._muted || e._muted || e._parent._muted ? 0 : e._volume;
      if (n._webAudio) {
        e._node = typeof t.ctx.createGain == "undefined" ? t.ctx.createGainNode() : t.ctx.createGain();
        e._node.gain.setValueAtTime(r, t.ctx.currentTime);
        e._node.paused = true;
        e._node.connect(t.masterGain);
      } else {
        e._node = new Audio();
        e._errorFn = e._errorListener.bind(e);
        e._node.addEventListener("error", e._errorFn, false);
        e._loadFn = e._loadListener.bind(e);
        e._node.addEventListener(t._canPlayEvent, e._loadFn, false);
        e._node.src = n._src;
        e._node.preload = "auto";
        e._node.volume = r * t.volume();
        e._node.load();
      }
      return e;
    },
    reset: function () {
      var e = this;
      var n = e._parent;
      e._muted = n._muted;
      e._loop = n._loop;
      e._volume = n._volume;
      e._rate = n._rate;
      e._seek = 0;
      e._rateSeek = 0;
      e._paused = true;
      e._ended = true;
      e._sprite = "__default";
      e._id = ++t._counter;
      return e;
    },
    _errorListener: function () {
      var e = this;
      e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0);
      e._node.removeEventListener("error", e._errorFn, false);
    },
    _loadListener: function () {
      var e = this;
      var n = e._parent;
      n._duration = Math.ceil(e._node.duration * 10) / 10;
      if (Object.keys(n._sprite).length === 0) {
        n._sprite = {
          __default: [0, n._duration * 1000]
        };
      }
      if (n._state !== "loaded") {
        n._state = "loaded";
        n._emit("load");
        n._loadQueue();
      }
      e._node.removeEventListener(t._canPlayEvent, e._loadFn, false);
    }
  };
  var o = {};
  function i(e) {
    var t = e._src;
    if (o[t]) {
      e._duration = o[t].duration;
      u(e);
      return;
    }
    if (/^data:[^;]+;base64,/.test(t)) {
      for (var n = atob(t.split(",")[1]), r = new Uint8Array(n.length), i = 0; i < n.length; ++i) {
        r[i] = n.charCodeAt(i);
      }
      a(r.buffer, e);
    } else {
      var l = new XMLHttpRequest();
      l.open("GET", t, true);
      l.withCredentials = e._xhrWithCredentials;
      l.responseType = "arraybuffer";
      l.onload = function () {
        var t = (l.status + "")[0];
        if (t !== "0" && t !== "2" && t !== "3") {
          e._emit("loaderror", null, "Failed loading audio file with status: " + l.status + ".");
          return;
        } else {
          a(l.response, e);
          return;
        }
      };
      l.onerror = function () {
        if (e._webAudio) {
          e._html5 = true;
          e._webAudio = false;
          e._sounds = [];
          delete o[t];
          e.load();
        }
      };
      s(l);
    }
  }
  function s(e) {
    try {
      e.send();
    } catch (t) {
      e.onerror();
    }
  }
  function a(e, n) {
    t.ctx.decodeAudioData(e, function (e) {
      if (e && n._sounds.length > 0) {
        o[n._src] = e;
        u(n, e);
      }
    }, function () {
      n._emit("loaderror", null, "Decoding audio data failed.");
    });
  }
  function u(e, t) {
    if (t && !e._duration) {
      e._duration = t.duration;
    }
    if (Object.keys(e._sprite).length === 0) {
      e._sprite = {
        __default: [0, e._duration * 1000]
      };
    }
    if (e._state !== "loaded") {
      e._state = "loaded";
      e._emit("load");
      e._loadQueue();
    }
  }
  function l() {
    try {
      if (typeof AudioContext != "undefined") {
        t.ctx = new AudioContext();
      } else if (typeof webkitAudioContext != "undefined") {
        t.ctx = new webkitAudioContext();
      } else {
        t.usingWebAudio = false;
      }
    } catch (e) {
      t.usingWebAudio = false;
    }
    var n = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform);
    var r = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    var o = r ? parseInt(r[1], 10) : null;
    if (n && o && o < 9) {
      var i = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
      if (t._navigator && t._navigator.standalone && !i || t._navigator && !t._navigator.standalone && !i) {
        t.usingWebAudio = false;
      }
    }
    if (t.usingWebAudio) {
      t.masterGain = typeof t.ctx.createGain == "undefined" ? t.ctx.createGainNode() : t.ctx.createGain();
      t.masterGain.gain.value = t._muted ? 0 : 1;
      t.masterGain.connect(t.ctx.destination);
    }
    t._setup();
  }
  if (typeof define == "function" && define.amd) {
    define([], function () {
      return {
        Howler: t,
        Howl: n
      };
    });
  }
  if (typeof exports != "undefined") {
    exports.Howler = t;
    exports.Howl = n;
  }
  if (typeof window != "undefined") {
    window.HowlerGlobal = e;
    window.Howler = t;
    window.Howl = n;
    window.Sound = r;
  } else if (typeof global != "undefined") {
    global.HowlerGlobal = e;
    global.Howler = t;
    global.Howl = n;
    global.Sound = r;
  }
})();
var dom = document;
dom.Id = dom.getElementById;
dom.El = dom.createElement;
var eui = 0;
var function_queue = [];
Seq.prototype = {
  then: function (e) {
    this.function_queue.push(e);
  },
  next: function () {
    var e = this;
    fu = e.function_queue.shift();
    return !!fu && (fu(function () {
      e.next();
    }), true);
  }
};
var pogencnt = 0;
if (!dialog) {
  console.log("Before this script, you have to load the script defining the dialog table.");
}
var POPREFIX_CMD = "cmd_";
var POPREFIX_ROOM = "room_";
var POPREFIX_ITEM = "item_";
var POPREFIX_PEOPLE = "people_";
var POSUFFIX_DESC = "_text";
var POSUFFIX_EXEC_DESC = "_exec";
var PO_NONE = "none";
var PO_NONE_DESC = PO_NONE + POSUFFIX_DESC;
var PO_DEFAULT_ROOM = POPREFIX_ROOM + PO_NONE;
var PO_DEFAULT_ITEM = POPREFIX_ITEM + PO_NONE;
var PO_DEFAULT_PEOPLE = POPREFIX_PEOPLE + PO_NONE;
var PO_DEFAULT_ROOM_DESC = POPREFIX_ROOM + PO_NONE_DESC;
var PO_DEFAULT_ITEM_DESC = POPREFIX_ITEM + PO_NONE_DESC;
var PO_DEFAULT_PEOPLE_DESC = POPREFIX_PEOPLE + PO_NONE_DESC;
String.prototype.printf = function (e) {
  var t = -1;
  return this.replace(/\%[sd]/g, function (n, r) {
    t++;
    return e[t];
  });
};
var type_decorations = {
  people: "<span class=\"color-people\">%s</span>",
  item: "<span class=\"color-item\">%s</span>",
  room: "<span class=\"color-room\">%s</span>",
  cmd: "<span class=\"color-cmd\">%s</span>"
};
var poe = typeof pogen == "function";
var var_regexp = /\{\{\w+(\.\w+|,\[([^,]*(,)?)\])?\}\}/g;
var var_vars_regexp = /\[([^,]*(,)?)\]/g;
var var_vars_regexpbis = /\.(\w+)/;
Cookie.prototype = {
  parse: function (e) {
    var t = null;
    for (var n = e.split(";"), r = 0; r < n.length; r++) {
      for (var o = n[r]; o.charAt(0) == " ";) {
        o = o.substring(1, o.length);
      }
      if (o.indexOf(this.name) === 0) {
        t = {};
        var i = o.split("=");
        i.shift();
        for (var s = 0; s < i.length; s++) {
          var a = i[s].split(":");
          if (a.length == 2 && a[1] !== "undefined") {
            t[a[0]] = a[1];
          }
        }
        break;
      }
    }
    return t;
  },
  check: function () {
    for (var e = dom.cookie.split(";"), t = 0; t < e.length; t++) {
      for (var n = e[t]; n.charAt(0) == " ";) {
        n = n.substring(1, n.length);
      }
      if (n.indexOf(this.name) === 0) {
        return true;
      }
    }
    return false;
  },
  stringify: function (e) {
    var t = "";
    for (var n in e) {
      if (e.hasOwnProperty(n)) {
        t += n + ":" + e[n] + "=";
      }
    }
    return t;
  },
  read: function () {
    return this.parse(dom.cookie);
  },
  write: function (e) {
    var t = new Date();
    t.setTime(t.getTime() + this.minutes * 60 * 1000);
    console.log("write cookie", e);
    dom.cookie = this.name + "=" + this.stringify(e) + "; expires=" + t.toGMTString() + "; path=/";
  },
  destroy: function () {
    this.minutes = -1;
    this.write("");
  }
};
GameState.prototype = {
  getCurrentRoom: function () {
    return window[this.params[""]];
  },
  saveCookie: function () {
    if (this.cookie) {
      this.cookie.write(this.params);
    }
  },
  setCurrentRoom: function (e) {
    if (e.varname) {
      this.params[""] = e.varname;
      this.saveCookie();
    }
  },
  add: function (e, t) {
    this.actions[e] = t;
  },
  set: function (e, t) {
    this.params[e] = t;
  },
  get: function (e, t) {
    return this.params[e];
  },
  applied: function (e) {
    return this.actions[e];
  },
  apply: function (e, t) {
    console.log("apply " + e);
    this.params[e] = 1;
    if (e in this.actions) {
      this.actions[e](typeof t != "undefined" && t);
    }
  },
  startCookie: function (e) {
    this.cookie = new Cookie(e);
    return this.cookie.check();
  },
  stopCookie: function (e) {
    this.cookie = null;
  },
  setCookieDuration: function (e) {
    this.cookie.minutes = e;
  },
  loadCookie: function () {
    var e = this.cookie.read();
    if (e) {
      for (var t in e) {
        if (e.hasOwnProperty(t)) {
          if (t in this.actions) {
            this.apply(t, e[t]);
          } else {
            this.set(t, e[t]);
          }
        }
      }
      this.saveCookie();
      return true;
    }
    return false;
  }
};
EventTarget.prototype = {
  addListener: function (e, t) {
    hdef(this._listeners, e, t);
    return this;
  },
  fire: function (e) {
    if (typeof e == "string") {
      e = {
        type: e
      };
    }
    e.target ||= this;
    if (!e.type) {
      throw new Error("Event object missing 'type' property.");
    }
    if (this._listeners[e.type] instanceof Array) {
      var t = this._listeners[e.type];
      for (var n = 0, r = t.length; n < r; n++) {
        t[n].call(this, e);
      }
    }
    return this;
  },
  removeListener: function (e, t) {
    if (this._listeners[e] instanceof Array) {
      var n = this._listeners[e];
      for (var r = 0, o = n.length; r < o; r++) {
        if (n[r] === t) {
          n.splice(r, 1);
          break;
        }
      }
    }
    return this;
  }
};
var audiotype = {
  mp3: "mpeg",
  ogg: "ogg",
  wav: "wav"
};
SoundBank.prototype = {
  set: function (e, t, n, r) {
    var o = this;
    r = d(r, {});
    required = d(r.required, true);
    o.ldr++;
    o.dict[e] = new Howl({
      src: n.map(function (e) {
        return t + e;
      }),
      onload: function () {
        o.ldr--;
        if (o.callback) {
          o.callback();
        }
      }
    });
  },
  isloaded: function () {
    return this.ldr == 0;
  },
  play: function (e) {
    if (this.dict.hasOwnProperty(e)) {
      this.dict[e].currenttime = 0;
      this.dict[e].volume = 1;
      this.dict[e].play();
    }
  },
  get: function (e) {
    if (this.dict.hasOwnProperty(e)) {
      return this.dict[e];
    } else {
      return null;
    }
  }
};
Music.prototype = {
  set: function (e, t, n) {
    this.soundbank.set(e, t, n, {
      required: false
    });
  },
  play: function (e, t) {
    t = d(t, {});
    n = this.soundbank.get(e);
    if (this.current !== e) {
      console.log("play " + e);
      c = this.soundbank.get(this.current);
      if (c) {
        c.pause();
        c.currentTime = 0;
      }
      if (n) {
        this.current = e;
        setAudioLoop(n, d(t.loop, false));
        setAudioFade(n, d(t.fadein, [1, 1, 0]));
        n.currenttime = d(t.currenttime, 0);
        this.currentmusic = n.play();
      }
    } else if (!n._loop) {
      n.stop(this.currentmusic);
      this.currentmusic = n.play();
    }
  },
  fadeTo: function (e, t) {
    c = this.soundbank.get(this.current);
    if (c) {
      setAudioFade(c, [c.volume, e, t]);
    }
  }
};
ReturnSequence.prototype = {
  next: function () {
    this.idx++;
    return this.seq.shift();
  },
  length: function () {
    return this.seq.length;
  },
  getIdx: function () {
    return this.idx;
  }
};
var SAFE_BROKEN_TEXT = true;
VTerm.prototype = {
  setContext: function (e) {
    this.context = e;
  },
  getContext: function () {
    return this.context;
  },
  flash: function (e, t) {
    setTimeout(function () {
      document.body.className += " flash";
      setTimeout(function () {
        document.body.className = document.body.className.replace(/[ ]*flash/, "");
      }, t);
    }, e);
  },
  wait_free: function (e) {
    this.waiting_fus.push(e);
  },
  run_waiting: function () {
    var e = this.waiting_fus.shift();
    if (e) {
      e(this);
    }
  },
  loop_waiting: function () {
    var e = 0;
    var t = this;
    t.waiting_interval ||= setInterval(function () {
      if (t.busy) {
        e = 0;
      } else if (e > 0 && t.waiting_fus.length > 0) {
        t.run_waiting();
      } else {
        e++;
        if (e > 10) {
          clearInterval(t.waiting_interval);
        }
      }
    }, 500);
  },
  push_img: function (e, t) {
    t = t || {};
    if (e) {
      var n = d(t.index, -1);
      this.imgs[n] ||= [];
      this.imgs[d(t.index, -1)].push(e);
    }
    return this;
  },
  unset_img: function () {
    var e = this;
    if (e.imgs.length > 0) {
      e.imgs.pop();
    }
  },
  show_img: function (e) {
    e = e || {};
    var t;
    var n = this;
    var r = d(e.index, -1);
    var o = n.imgs[r];
    if (o && o.length > 0) {
      var i = function () {
        n.scrl(1000);
      };
      var s = addEl(n.monitor, "div", "img-container");
      for (; t = o.shift();) {
        t.render(s, i);
      }
    }
  },
  epic_img_enter: function (e, t, n, r) {
    var o = this;
    o.scrl_lock = true;
    var i = addEl(o.monitor, "div", "img-container " + t);
    pic = new Pic(e);
    pic.render(i, function () {
      i.className += " loaded";
      setTimeout(function () {
        o.scrl_lock = false;
        o.scrl();
        if (def(r)) {
          r(vt);
        }
      }, n);
    });
  },
  clear: function () {
    this.monitor.innerHTML = "";
  },
  muteSound: function () {
    this.mute = true;
  },
  unmuteSound: function () {
    this.mute = false;
  },
  muteCommandResult: function () {
    this.cmdoutput = false;
  },
  unmuteCommandResult: function () {
    this.cmdoutput = true;
  },
  playSound: function (e) {
    if (!this.mute) {
      this.soundbank.play(e);
    }
  },
  get_line: function () {
    return this.input.value.replace(/\s+/, " ");
  },
  set_line: function (e) {
    this.input.value = e;
  },
  get_cursor_pos: function () {
    return this.input.selectionStart;
  },
  set_cursor_pos: function (e) {
    this.input.selectionStart = e;
  },
  scrl: function (e, t) {
    var n = this;
    var r = n.monitor;
    t = d(t, 2);
    var o = r.parentNode.offsetTop + r.offsetTop + r.offsetHeight + n.inputdiv.offsetHeight - window.pageYOffset - window.innerHeight;
    if (o > 0) {
      if (!n.scrl_lock && !def(e)) {
        window.scrollBy(0, o);
        return true;
      }
      e = d(e, 100);
      t--;
      if (t > 0) {
        setTimeout(function () {
          n.scrl(0, t);
        }, e);
      }
    }
  },
  disable_input: function () {
    var e = this;
    return !e.disabled.input && (e.disabled.input = true, e.btn_clear.setAttribute("disabled", ""), e.btn_tab.setAttribute("disabled", ""), e.inputdiv.removeChild(e.cmdline), true);
  },
  enable_input: function () {
    var e = this;
    return !!e.disabled.input && (e.disabled.input = false, e.inputdiv.prepend(e.cmdline), e.btn_clear.removeAttribute("disabled"), e.btn_tab.removeAttribute("disabled"), e.enterKey = e.enter, e.input.focus(), true);
  },
  show_previous_prompt: function (e) {
    addEl(this.monitor, "p", "input").innerText = e;
  },
  _show_chars: function (e, t, n, r, o, i, s, a, u, d) {
    l = n.shift();
    var c = this;
    c.busy = true;
    if (def(l)) {
      var m;
      if (l == "<") {
        var _ = "<";
        for (; def(l) && l != ">";) {
          l = n.shift();
          _ += l;
        }
        var p = _.replace(/<([^ ]*).*>/, "$1");
        if (p == "img") {
          t.innerHTML += _;
          c.playSound("tag");
          m = c.charfactor[l];
        } else if (p == "voice") {
          a = _.replace(/<([^ ]*)[ ]*([^ ]*)\/>/, "$2");
        } else {
          var f = "";
          for (l = n.shift(); def(l) && l != ">";) {
            f += l;
            l = n.shift();
          }
          t.innerHTML += _ + f;
        }
        c.scrl();
      } else if (c.charfactor.hasOwnProperty(l)) {
        t.innerHTML += c.charhtml[l] ? c.charhtml[l] : l;
        c.playSound(l);
        m = c.charfactor[l];
        c.scrl();
      } else {
        t.innerHTML += l;
        if (c.charfactor.char > 0 && u % 3 == 1) {
          c.playSound(a);
        }
        m = c.charfactor.char;
      }
      if (r && c.msg_idx != e) {
        if (SAFE_BROKEN_TEXT || o) {
          t.innerHTML = s;
          c.scrl();
        }
        c.playSound("brokentext");
        if (i) {
          i();
        }
        if (d.cb) {
          d.cb();
        }
        c.busy = false;
      } else {
        setTimeout(function () {
          c._show_chars(e, t, n, r, o, i, s, a, ++u, d);
        }, m * c.charduration);
      }
    } else {
      c.playSound("endoftext");
      if (i) {
        i();
      }
      if (d.cb) {
        d.cb();
      }
      c.busy = false;
    }
  },
  rmCurrentImg: function (e) {
    var t = this;
    setTimeout(function () {
      var e;
      var n = t.current_msg.getElementsByClassName("img-container");
      for (e = 0; e < n.length; e++) {
        msg.removeChild(n[e]);
      }
    }, e);
  },
  show_loading_element_in_msg: function (e, t) {
    var n = this;
    t = t || {};
    var r;
    var o = d(t.container, n.monitor);
    r = t.el ? t.el : addEl(o, "div", "inmsg");
    var i = d(t.period, 100);
    var s = t.duration;
    var a = t.finalvalue;
    var u = t.callback;
    var l = 0;
    var c = n.msg_idx;
    var m = setInterval(function () {
      if (n.msg_idx != c) {
        clearInterval(m);
        if (a) {
          r.innerHTML = a;
          n.ghostel.innerHTML += " " + a + " ";
        }
        if (u) {
          u();
        }
      } else {
        r.innerHTML = e[l % e.length];
        l++;
      }
    }, i);
    if (s) {
      setTimeout(function () {
        if (c == n.msg_idx) {
          n.msg_idx++;
        }
      }, s);
    }
    return this;
  },
  show_msg: function (e, t) {
    if (def(e)) {
      t = t || {};
      var n;
      var r = this;
      r.busy = true;
      r.loop_waiting();
      if (typeof e != "string") {
        n = e[1];
        e = e[0];
      }
      var o = d(t.el, r.monitor);
      var i = d(t.dependant, true);
      var s = d(t.safe, false);
      var a = d(t.direct, false);
      r.ghostel = addEl(r.ghost_monitor, "p");
      r.current_msg = addEl(o, "p", "msg");
      if (e.nodeType == 1) {
        r.current_msg.appendChild(e);
        r.ghostel.innerHTML = e.outerHTML.replace(/<div class='inmsg'.*><\/div>/, "");
        if (n) {
          n();
        }
        if (t.cb) {
          t.cb();
        }
        r.busy = false;
      } else {
        txt = e.toString();
        txt = txt.replace(/(#[^#]+#)/g, "<i class=\"hashtag\"> $1 </i>");
        txttab = txt.split("");
        r.msg_idx++;
        txt = txt.replace(/\t/g, "&nbsp;&nbsp;").replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
        r.ghostel.innerHTML = txt.replace(/<div class='inmsg'.*><\/div>/, "").replace(/(<br>)/g, "<&nbsp;><br>").replace(/[«»]/g, "\"").replace(/(\.\.\.)/g, "<br>");
        if (a) {
          r.current_msg.innerHTML = txt;
          if (n) {
            n();
          }
          if (t.cb) {
            t.cb();
          }
          r.busy = false;
          r.scrl();
        } else {
          r._show_chars(r.msg_idx, r.current_msg, txttab, i, s, n, txt, "char", 1, t);
        }
      }
    }
    return this;
  },
  make_suggestions: function (e, t) {
    function n(e, t) {
      var n = new RegExp("^" + o.complete_opts.fuzzy(t), o.complete_opts.case);
      return o.complete_opts.fuzzy(e).match(n);
    }
    var r = true;
    var o = this;
    e = d(e, -1);
    t = d(t, true);
    o.suggestions.innerHTML = "";
    var i = o.get_line();
    var s = o.input.selectionStart;
    var a = [];
    args = i.split(" ");
    o.suggestion_selected = null;
    if (args.length > 0) {
      var u;
      var l = 0;
      for (u = 0; u < args.length && (l += args[u].length + 1, !(l > s)); u++);
      var c = args[u];
      var m = [];
      if (c && u > 0) {
        m = _completeArgs(args, u, c, o.context, n);
      } else if (args[0].length > 0) {
        if (_hasRightForCommand(args[0], user.groups)) {
          m = _completeArgs(args, u, c, o.context, n);
        } else {
          var _ = _getCommands(o.context);
          u = 0;
          for (var p = 0; p < _.length; p++) {
            var f = new RegExp("^" + o.complete_opts.fuzzy(c), o.complete_opts.case);
            if (_[p].match(f)) {
              m.push(_[p]);
            }
          }
        }
      } else {
        c = "";
        m = _getCommands(o.context).map(addspace);
      }
      if (m.length === 0) {
        o.set_line(i + "?");
        setTimeout(function () {
          o.set_line(i + "??");
        }, 100);
        setTimeout(function () {
          o.set_line(i);
        }, 200);
      } else if (m.length == 1) {
        if (t) {
          var h = c.split("/");
          h[h.length - 1] = m[0];
          args.splice(u, 1, h.join("/"));
          o.set_line(args.join(" ").replace("././", "./"));
        } else {
          if (m[0] == c) {
            o.set_line(i + " ");
          }
          o.show_suggestions(m);
        }
      } else {
        var v = commonprefix(m);
        if (m.indexOf(v) > -1) {
          o.set_line(i + " ");
        } else if (e > -1) {
          if (e < m.length) {
            a[e] = "select";
            o.suggestion_selected = m[e];
          } else {
            r = false;
          }
        }
        if (v.length > 0 && t) {
          var h = c.split("/");
          h[h.length - 1] = v;
          args.splice(u, 1, h.join("/"));
          o.set_line(args.join(" "));
        }
        o.show_suggestions(m, a);
      }
    }
    return r;
  },
  show_suggestions: function (e, t) {
    t = t || [];
    this.suggestions.innerHTML = "<div class=\"visually-hidden\">" + _("Suggestions") + "</div>";
    for (var n = 0; n < e.length; n++) {
      this.show_suggestion(e[n], t[n]);
    }
  },
  show_suggestion: function (e, t) {
    var n = this;
    n.histindex = 0;
    addBtn(n.suggestions, t, e.replace(/(#[^#]+#)/g, "<i class=\"hashtag\"> $1 </i>"), e, function (t) {
      n.input.value += e;
      if (n.argsValid(n.input.value.replace(/\s+$/, "").split(" "))) {
        n.enter();
      } else {
        n.make_suggestions(-1, false);
      }
    });
    n.scrl();
  },
  hide_suggestions: function () {
    this.suggestions.innerHTML = "";
  },
  argsValid: function (e) {
    return _validArgs(e.shift(), e, this.context);
  },
  echo: function (e) {
    var t = this;
    if (def(e)) {
      if (e.isReturnSequence) {
        if (!e.length()) {
          return;
        }
        var n = [];
        for (var r = 0; r < e.length(); r++) {
          n.push(function () {
            t.show_img({
              index: e.getIdx()
            });
            t.show_msg(e.next(), {
              cb: n.shift()
            });
          });
        }
        n.shift()();
      } else {
        t.show_img();
        if (t.cmdoutput) {
          t.show_msg(e);
        }
      }
    }
  },
  enter: function () {
    var e = this;
    e.playSound("enter");
    var t = e.get_line().replace(/\s+$/, "");
    if (t.length > 0) {
      var n = e.input;
      var r = e.monitor;
      e.monitor = addEl(r, "div", "screen");
      e.histindex = 0;
      e.show_previous_prompt(n.value);
      e.history.push(n.value);
      var o = t.split(" ");
      e.echo(_parse_exec(e, o));
      e.set_line("");
      e.hide_suggestions();
      e.monitor = r;
    }
  },
  enterKey: this.enter,
  behave: function () {
    this.global_behavior();
    this.input_behavior();
  },
  global_behavior: function () {
    window.onbeforeunload = function (e) {
      return "Quit the game ?";
    };
  },
  _cmdline_key: function () {},
  input_behavior: function () {
    var e = this;
    var t = e.input;
    dom.body.onkeydown = function (n) {
      n = n || window.event;
      if (def(e.battle_scene)) {
        e.battle_scene.onkeydown(n);
      } else if (def(e.choose_input)) {
        n.preventDefault();
      } else {
        var r = n.key;
        if (r === "ArrowRight" || r === "ArrowLeft" || r === "ArrowUp" || r === "ArrowDown") {
          if (n.shiftKey) {
            n.preventDefault();
          }
        } else {
          var o = dom.activeElement;
          if (!o || o != t) {
            t.focus();
            e.scrl();
          }
          t.onkeydown(n);
        }
      }
    };
    dom.body.onkeyup = function (n) {
      n = n || window.event;
      if (def(e.battle_scene)) {
        e.battle_scene.onkeyup(n);
      } else if (def(e.choose_input)) {
        e._choose_key(n.key, n);
      } else {
        var r = n.key;
        if (r === "ArrowRight" || r === "ArrowLeft" || r === "ArrowUp" || r === "ArrowDown") {
          if (n.shiftKey) {
            n.preventDefault();
          }
        } else {
          var o = dom.activeElement;
          if (!o || o != t) {
            t.focus();
            e.scrl();
          }
          t.onkeyup(n);
        }
      }
    };
    var n = [null, 0];
    t.onkeydown = function (e) {
      var n = e.key;
      if (n === "Tab" || n == "Enter") {
        overide(e);
      } else if (e.ctrlKey) {
        if (n === "c" || n === "v" || n === "x" || n === "y" || n === "z") {
          overide(e);
        }
      } else if (n === "PageUp" || n === "PageDown") {
        window.focus();
        t.blur();
      }
      if (n === "ArrowUp" || n === "ArrowDown") {
        overide(e);
      }
      return !e.defaultPrevented;
    };
    t.onkeyup = function (r) {
      var o = r.key;
      vt.statkey[o] = (vt.statkey[o] || 0) + 1;
      if (n[0] == o) {
        n[1]++;
      } else {
        n[1] = 0;
      }
      n[0] = o;
      e.hide_suggestions();
      if (o === "Enter") {
        overide(r);
        if (e.suggestion_selected) {
          e.input.value += e.suggestion_selected;
          e.suggestion_selected = 0;
          e.make_suggestions();
          n[0] = "Tab";
        } else {
          e.enter();
        }
        e.scrl();
      } else if (o !== "Tab" || r.ctrlKey || r.altKey) {
        if (r.ctrlKey) {
          if (o === "c") {
            overide(r);
            e.show_previous_prompt(e.get_line() + "^C");
            e.msg_idx++;
            e.set_line("");
          } else if (o === "u") {
            overide(r);
            e.set_line("");
          } else if (o === "v" || o === "x") {
            overide(r);
            var i = e.get_line();
            i = i.replace(/\/$/, "");
            var s = i.split(" ");
            var a = s.pop().split("/");
            a.pop();
            if (a.length > 1) {
              a.push("");
            }
            s.push(a.join("/"));
            e.set_line(s.join(" "));
          }
        } else if (o === "PageUp" || o === "PageDown") {
          window.focus();
          t.blur();
        } else if (o === "ArrowDown") {
          if (e.histindex > 0) {
            e.histindex--;
            e.set_line(e.history[e.history.length - 1 - e.histindex]);
          }
        } else if (o === "ArrowUp" && e.histindex < e.history.length) {
          var u = e.history[e.history.length - 1 - e.histindex];
          if (e.histindex === 0) {
            var l = e.get_line();
            if (l.length > 0 && l !== u) {
              e.history.push(l);
            }
          }
          e.set_line(u);
          e.histindex++;
        }
      } else {
        overide(r);
        if (!e.make_suggestions(n[1] - 1)) {
          n[1] = 0;
        }
        e.scrl();
      }
      return !r.defaultPrevented;
    };
  },
  badge: function (e, t) {
    var n = this;
    var r = addEl(n.notifications, "div", "badge");
    var o = Date.now();
    var i = n.last_notify - o;
    var s = 0;
    if (i > 0) {
      s = i;
    }
    var a = s + n.timeout.badge / 2;
    var u = s + n.timeout.badge;
    setTimeout(function () {
      n.notifications.removeChild(r);
    }, u);
    setTimeout(function () {
      r.className += " disappear";
    }, a);
    setTimeout(function () {
      n.badge_pic.render(r);
      addEl(r, "span", "badge-title").innerHTML = e;
      addEl(r, "p", "badge-desc").innerText = t;
    }, s);
    n.last_notify = o + u;
  },
  notification: function (e) {
    var t = this;
    var n = addEl(t.notifications, "div", "notification");
    var r = Date.now();
    var o = t.last_notify - r;
    var i = 0;
    if (o > 0) {
      i = o;
    }
    var s = i + t.timeout.notification / 2;
    var a = i + t.timeout.notification;
    setTimeout(function () {
      t.notifications.removeChild(n);
    }, a);
    setTimeout(function () {
      n.className += " disappear";
    }, s);
    setTimeout(function () {
      addEl(n, "p").innerHTML = e;
    }, i);
    t.last_notify = r + a;
  },
  ask_choose: function (e, t, n, r) {
    var o = this;
    var i = [];
    var s = 0;
    r = d(r, {});
    disabled_choices = d(r.disabled_choices, []);
    direct = d(r.direct, false);
    while (disabled_choices.indexOf(s) > -1) {
      s++;
    }
    var a = addEl(o.monitor, "div", "choicebox");
    o.show_msg(e, {
      direct: direct,
      el: a,
      dependant: false
    });
    o.set_line("");
    o.choose_input = addEl(a, "fieldset", "choices");
    var u = o.disable_input();
    function l(e) {
      var t = e.target.getAttribute("idx");
      addAttrs(i[s], {
        checked: ""
      });
      addAttrs(i[t], {
        checked: "checked"
      });
      s = t;
      return o.enterKey();
    }
    function c(e) {
      o._choose_key(e.key, e);
    }
    o.enterKey = function (e) {
      o.playSound("choiceselect");
      o.choose_input.value = t[s];
      o.show_msg(t[s], {
        el: a,
        dependant: false
      });
      a.removeChild(o.choose_input);
      o.choose_input = undefined;
      if (u) {
        o.enable_input();
      }
      o.show_msg(n(o, s));
    };
    o._choose_key = function (e, n) {
      if (e == "ArrowDown" || e == "ArrowUp" || e == "Tab") {
        o.playSound("choicemove");
        i[s].removeAttribute("checked");
        if (e == "ArrowDown" || !n.shiftKey && e == "Tab") {
          for (s = ++s % i.length; disabled_choices.indexOf(s) > -1;) {
            s = ++s % i.length;
          }
        } else if (e == "ArrowUp" || n.shiftKey && e == "Tab") {
          for (s = --s >= 0 ? s : i.length - 1; disabled_choices.indexOf(s) > -1;) {
            s = --s >= 0 ? s : i.length - 1;
          }
        }
        addAttrs(i[s], {
          checked: "checked"
        });
        i[s].focus();
        o.ghostel.innerHTML = t[s];
      } else if (e == "Enter") {
        o.enterKey();
      }
      n.preventDefault();
    };
    for (var m = 0; m < t.length; m++) {
      if (disabled_choices.indexOf(m) == -1) {
        cho = addEl(o.choose_input, "div", "choice");
        t[m] = t[m];
        i.push(addEl(cho, "input", {
          type: "radio",
          name: "choose",
          idx: m,
          id: "radio" + m
        }));
        addAttrs(i[m], {
          role: "log",
          "aria-live": "polite",
          "aria-relevant": "all"
        });
        i[m].onclick = l;
        i[m].onkeydown = c;
        addEl(cho, "span", "selectpointer");
        addEl(cho, "label", {
          for: "radio" + m
        }).innerHTML = t[m].replace(/(#[^#]+#)/g, "<i class=\"hashtag\"> $1 </i>");
      } else {
        i.push(null);
      }
    }
    o.choose_input.onkeydown = c;
    addAttrs(o.choose_input, {
      value: t[s]
    });
    addAttrs(i[s], {
      checked: "checked"
    });
    o.scrl();
  },
  battlescene: function (e, t) {
    var n = this;
    n.set_line("");
    var r = n.monitor;
    var o = addEl(r, "div", "battlescene-container");
    n.battle_scene = addEl(o, "div", "battlescene");
    n.disable_input();
    function i() {
      n.battle_scene.setAttribute("disabled", true);
      r.removeChild(o);
      n.battle_scene = undefined;
      if (t) {
        t();
      }
    }
    n.enterKey = function () {
      console.log("Enter Pressed but Battle Mode");
    };
    return e(vt, n.battle_scene, i);
  },
  ask: function (e, t, n) {
    var r = this;
    r.set_line("");
    var o = n.wait || 0;
    var i = n.timeout || null;
    var s = addEl(r.monitor, "div", n.cls || "choicebox");
    r.show_msg([e, function () {
      setTimeout(function () {
        var e = addEl(s, "div", "input-wrapper");
        if (n.multiline) {
          r.answer_input = addEl(e, "textarea", {
            cols: 78
          });
        } else {
          r.answer_input = addEl(e, "input", {
            size: 78
          });
        }
        var t = addEl(s, "div", "keys");
        addBtn(t, "key", "↵", "Enter", function (e) {
          r.enterKey();
        });
        if (n.value) {
          r.answer_input.value = n.value;
        }
        if (n.placeholder) {
          r.answer_input.placeholder = n.placeholder;
        }
        r.answer_input.focus();
        r.answer_input.onkeyup = function (e) {
          if (e.key === "Enter") {
            if (e.ctrlKey || !n.multiline) {
              r.enterKey();
              e.preventDefault();
              r.scrl();
            } else {
              var t = r.answer_input.selectionStart;
              var o = r.answer_input.value.substr(0, t);
              var i = r.answer_input.value.substr(t);
              r.answer_input.value = o + "\n" + i;
              r.answer_input.selectionStart = t + 1;
              r.answer_input.selectionEnd = t + 1;
            }
          }
        };
      }, o);
      if (i) {
        setTimeout(function () {
          r.playSound("choiceselect");
          var e = r.answer_input.value;
          e = t ? t(e) : e;
          l();
          r.echo(e);
        }, o + i);
      }
    }], {
      el: s,
      dependant: false
    });
    var a = !r.disabled.input;
    var u = null;
    if (n.disappear) {
      u = function () {
        s.outerHTML = "";
      };
    }
    r.disable_input();
    function l() {
      r.answer_input.setAttribute("disabled", true);
      r.answer_input = undefined;
      if (n.disappear) {
        n.disappear(u);
      }
      if (a) {
        r.enable_input();
      }
    }
    r.enterKey = function () {
      r.playSound("choiceselect");
      var e = r.answer_input.value;
      e = t ? t(e) : e;
      l();
      r.echo(e);
    };
  },
  auto_shuffle_input_msg: function (e, t, n, r, o, i, s) {
    var a = this;
    var u = a.msg_idx;
    if (a.input_operation_interval) {
      clearInterval(a.input_operation_interval);
    }
    var l = 0;
    var d = t;
    var c = n > t ? 1 : -1;
    var m = n * c;
    var _ = (n - t) / r;
    a.input_operation_interval = setInterval(function () {
      if (a.msg_idx != u) {
        clearInterval(a.input_operation_interval);
        a.set_line("");
      } else {
        if (d * c < m && l % s == 0) {
          d += _;
        }
        a.shuffle_input_msg(e, d);
        l++;
      }
    }, o);
    if (i) {
      setTimeout(function () {
        if (u == a.msg_idx) {
          a.msg_idx++;
        }
      }, i);
    }
  },
  auto_shuffle_input: function (e, t, n, r, o) {
    var i = this;
    var s = i.msg_idx;
    if (i.input_operation_interval) {
      clearInterval(i.input_operation_interval);
    }
    var a = 0;
    var u = e;
    i.input_operation_interval = setInterval(function () {
      if (i.msg_idx != s) {
        clearInterval(i.input_operation_interval);
        i.set_line("");
      } else if (o) {
        if (a % o == 0) {
          u++;
        }
        i.shuffle_input(u, null);
        a++;
      } else {
        i.shuffle_input(e, t);
      }
    }, n);
    if (r) {
      setTimeout(function () {
        if (s == i.msg_idx) {
          i.msg_idx++;
        }
      }, r);
    }
  },
  shuffle_input: function (e, t) {
    var n = e + (t ? Math.round(Math.random() * (t - e)) : 0);
    this.set_line(randomStr(n));
  },
  shuffle_input_msg: function (e, t) {
    this.set_line(shuffleStr(e, t));
  }
};
var user = {
  groups: [],
  name: "",
  address: ""
};
var TESTING = false;
var ARGT = {
  dir: [0],
  file: [1],
  opt: [2],
  instr: [3],
  var: [4],
  strictfile: [5],
  cmdname: [6],
  filename: [7],
  filenew: [8],
  dirnew: [9],
  pattern: [10],
  msgid: [12]
};
var global_commands_fu = {};
var global_fireables = {
  done: []
};
_setupCommand("less", null, [ARGT.strictfile], function (e, t) {
  var n = t.getContext();
  var r = [];
  if (e.length < 1) {
    n.fire_event(t, "less_no_arg", e, 0);
    return _("cmd_less_no_arg");
  }
  for (var o = 0; o < e.length; o++) {
    var i = n.traversee(e[o]);
    var s = i.room;
    if (s) {
      var a = i.item;
      if (a) {
        if (a.readable || n.sudo) {
          t.push_img(a.picture, {
            index: r.length
          });
          s.fire_event(t, "less", e, o);
          a.fire_event(t, "less", e, o);
          r.push(cmd_done(t, [[s, 0], [a, o + 0]], a.cmd_text.less, "less", e));
        } else {
          a.fire_event(t, "unreadable", e, o);
        }
      } else {
        s.fire_event(t, "destination_unreachable", e, o);
        r.push(_("item_not_exists", e));
      }
    } else {
      s.fire_event(t, "destination_unreachable", e, o);
      r.push(_("room_unreachable"));
    }
  }
  return new ReturnSequence(r);
});
_lnCommand("cat", "less");
_lnCommand("more", "less");
_setupCommand("ls", "dir", [ARGT.dir], function (e, t) {
  function n(e, t) {
    var n;
    var r = "";
    var o = {};
    t = t || {
      item: "item",
      people: "people",
      subroom: "inside-room"
    };
    if (e.children.length > 0 || !e.isRoot) {
      tmpret = "";
      n = 0;
      for (; n < e.children.length; n++) {
        tmpret += span("color-room", e.children[n].toString() + "/") + "\n\t";
        if (e.children[n].picture && e.children[n].picture.shown_as_item) {
          e.children[n].picture.setOneShotRenderClass(t.subroom);
          o["room-" + n] = e.children[n].picture;
        }
      }
      r += _("directions", ["\t" + (e.isRoot ? "" : span("color-room", "..") + " (revenir sur tes pas)\n\t") + tmpret]) + "\t\n";
    }
    var i = e.items.filter(function (e) {
      return !e.people;
    });
    var s = e.items.filter(function (e) {
      return e.people;
    });
    for (n = 0; n < s.length; n++) {
      if (s[n].picture && s[n].picture.shown_in_ls) {
        s[n].picture.setOneShotRenderClass(t.people);
        o["peoples-" + n] = s[n].picture;
      }
    }
    if (s.length > 0) {
      r += _("peoples", ["\t" + s.map(function (e) {
        return span("color-people", e.toString());
      }).join("\n\t")]) + "\t\n";
    }
    n = 0;
    for (; n < i.length; n++) {
      if (i[n].picture && i[n].picture.shown_in_ls) {
        i[n].picture.setOneShotRenderClass(t.item);
        o["item-" + n] = i[n].picture;
      }
    }
    if (i.length > 0) {
      r += _("items", ["\t" + i.map(function (e) {
        return span("color-item" + (e.executable ? " color-executable" : ""), e.toString());
      }).join("\n\t")]) + "\t\n";
    }
    return {
      txt: r,
      pics: o
    };
  }
  var r;
  var o = t.getContext();
  if (e.length > 0) {
    var i = o.traversee(e[0]).room;
    if (i) {
      if (i.readable || o.sudo) {
        if (i.children.length === 0 && i.items.length === 0) {
          prtls = {
            pics: {},
            txt: _("room_empty")
          };
        } else {
          prtls = n(i);
        }
        r = i.picture.copy();
        r.addChildren(prtls.pics);
        r.setOneShotRenderClass("room");
        t.push_img(r);
        return cmd_done(t, [[i, 0]], prtls.txt, "ls", e);
      } else {
        return _("permission_denied") + " " + _("room_unreadable");
      }
    } else {
      return _("room_unreachable");
    }
  }
  prtls = n(o);
  r = o.picture.copy();
  r.addChildren(prtls.pics);
  r.setOneShotRenderClass("room");
  t.push_img(r);
  return cmd_done(t, [[o, 0]], prtls.txt, "ls", e);
});
_setupCommand("cd", "dir", [ARGT.dir], function (e, t) {
  var n = t.getContext();
  if (e.length > 1) {
    return _("cmd_cd_flood");
  }
  if (e[0] !== "-") {
    if (e.length === 0) {
      return _("cmd_cd_no_args") + (_hasRightForCommand("pwd") ? "\n" + _("cmd_cd_no_args_pwd") : "");
    }
    if (e[0] === "~") {
      $home.previous = n;
      enterRoom($home, t);
      return _("cmd_cd_home");
    }
    if (e[0] === "..") {
      n.fire_event(t, "cd", e, 0);
      if (n.parents.length >= 1) {
        n.parents[0].previous = n;
        return _("cmd_cd_parent", enterRoom(n.parents[0], t));
      } else {
        return _("cmd_cd_no_parent");
      }
    }
    if (e[0] === ".") {
      t.push_img(img.room_none);
      return _("cmd_cd", enterRoom(n, t));
    }
    var r = n.traversee(e[0]);
    var o = r.room;
    if (o && !r.item_name) {
      if (o.executable) {
        o.previous = n;
        return _("cmd_cd", enterRoom(o, t));
      } else {
        n.fire_event(t, "cd", e, 0, {
          unreachable_room: o
        });
        return o.cmd_text.cd;
      }
    } else {
      n.fire_event(t, "cd", e, 0, {
        unreachable_room: o
      });
      return _("cmd_cd_failed", e);
    }
  }
  n.previous.previous = n;
  enterRoom(n.previous, t);
});
_setupCommand("man", "help", [ARGT.cmdname], function (e, t) {
  return _(e.length < 1 ? "cmd_man_no_query" : "man_" + e[0] in dialog ? "man_" + e[0] : "cmd_man_not_found");
});
_setupCommand("help", null, [ARGT.cmdname], function (e, t) {
  ret = _("cmd_help_begin") + "\n";
  for (var n = _getUserCommands(), r = 0; r < n.length; r++) {
    ret += "<pre>" + n[r] + "\t</pre>: " + _("help_" + n[r]) + "\n";
  }
  return ret;
});
_setupCommand("exit", null, [], function (e, t) {
  setTimeout(function () {
    dom.body.innerHTML = _("cmd_exit_html");
  }, 2000);
  return _("cmd_exit");
});
_setupCommand("pwd", null, [], function (e, t) {
  var n = t.getContext();
  t.push_img(n.picture);
  return _(POPREFIX_CMD + "pwd", [n.name]).concat("\n").concat(n.intro_text);
});
_setupCommand("cp", null, [ARGT.file, ARGT.filenew], function (e, t) {
  var n = t.getContext();
  if (e.length != 2) {
    return _("incorrect_syntax");
  }
  var r = n.traversee(e[0]);
  var o = n.traversee(e[1]);
  if (r.item) {
    if (o.item) {
      return _("tgt_already_exists", [o.item_name]);
    }
    if (o.room) {
      nut = r.item.copy(o.item_name);
      o.room.addItem(nut);
      nut.fire_event(t, "cp", e, 1);
      r.item.fire_event(t, "cp", e, 0);
      o.room.fire_event(t, "cp", e, 1);
      return cmd_done(t, [[r.item, 0], [nut, 1]], _("cmd_cp_copied", e), "cp", e);
    }
  }
  return _("cmd_cp_unknown");
});
_setupCommand("mv", null, [ARGT.strictfile, ARGT.file], function (e, t) {
  var n;
  var r = t.getContext();
  var o = [];
  var i = r.traversee(e[e.length - 1]);
  if (!i.item_name || !(e.length > 2)) {
    var s;
    var a;
    var u = [];
    for (var l = 0; l < e.length - 1; l++) {
      n = r.traversee(e[l]);
      if (n.room) {
        if (n.item && i.room) {
          s = i.item_name && n.item_name !== i.item_name;
          a = i.item;
          if (i.room.writable) {
            if (n.item_idx > -1) {
              if (n.room.writable) {
                if (a) {
                  i.room.removeItemByIdx(i.item_idx);
                }
                if (s) {
                  n.item.name = i.item_name;
                }
                n.room.fire_event(t, "mv", [e[l], e[e.length - 1]], 0);
                if (n.room.uid !== i.room.uid) {
                  i.room.addItem(n.item);
                  n.room.removeItemByIdx(n.item_idx);
                  n.item.fire_event(t, "mv_outside", [e[l], e[e.length - 1]], 0);
                  if ("mv" in n.item.cmd_text) {
                    o.push(n.item.cmd_text.mv);
                  } else {
                    o.push(_("cmd_mv_done", [e[l], e[e.length - 1]]));
                  }
                } else {
                  n.item.fire_event(t, "mv_local", [e[l], e[e.length - 1]], 0);
                }
                n.item.fire_event(t, "mv", [e[l], e[e.length - 1]], 0);
                if (s) {
                  n.item.fire_event(t, "mv_name", e, 0);
                  if ("mv_name" in n.item.cmd_text) {
                    o.push(n.item.cmd_text.mv_name);
                  } else if (!a) {
                    o.push(_("cmd_mv_name_done", [e[l], e[e.length - 1]]));
                  }
                }
                if (a) {
                  o.push(_("cmd_mv_overwrite_done", [e[l], e[e.length - 1]]));
                }
                u.push([n.item, 0]);
              } else if ("mv" in n.item.cmd_text) {
                o.push(n.item.cmd_text.mv);
              } else {
                o.push(_("permission_denied") + " " + _("cmd_mv_fixed"));
              }
            }
          } else {
            o.push(_("permission_denied") + " " + _("cmd_mv_dest_fixed"));
          }
        } else {
          n[2];
        }
      } else {
        o.push(_("cmd_mv_no_file", [e[l]]));
      }
    }
    return cmd_done(t, u, o.join("\n"), "mv", e);
  }
  o.push(_("cmd_mv_flood"));
  return o.join("\n");
});
_setupCommand("rm", null, [ARGT.file], function (e, t) {
  var n = t.getContext();
  if (e.length < 1) {
    return _("cmd_rm_miss");
  }
  var r;
  var o;
  var i = "";
  for (var s = 0; s < e.length; s++) {
    var a = n.traversee(e[s]);
    r = a.room;
    o = a.item_idx;
    if (o > -1) {
      if (!r.writable) {
        return a.item.cmd_text.rm || _("cmd_rm_invalid");
      }
      var u = r.removeItemByIdx(o);
      if (u) {
        r.fire_event(t, "rm", e, s);
        i += "rm" in u.cmd_text ? u.cmd_text.rm + "\n" : _("cmd_rm_done", [e[s]]);
        u.fire_event(t, "rm", e, s);
      } else {
        i += _("cmd_rm_failed");
      }
    }
    return i;
  }
});
_setupCommand("grep", null, [ARGT.pattern, ARGT.strictfile], function (e, t) {
  var n = t.getContext();
  var r = e[0];
  for (var o = e.slice(1), i = [], s = 0; s < o.length; s++) {
    var a = o[s];
    var u = n.traversee(a);
    if (u.item) {
      var l = u.item.cmd_text.less;
      var d = [];
      var c = false;
      if (u.item.readable || n.sudo) {
        if (u.item.cmd_text.grep) {
          var m = "";
          if (r.length > 2) {
            r.split(" ").filter(function (e) {
              if (m.length < e.length) {
                m = e;
              }
            });
            d = u.item.cmd_text.grep.split(/( |\n)/).filter(function (e) {
              return e.length > 1 && e.indexOf(m) >= 0 && m.length > e.length / 2;
            });
            if (d.length > 0) {
              l = u.item.cmd_text.grep;
              c = true;
            }
          }
          if (u.item.cmd_text.grep_overflow && !c && m.length < 6) {
            i.push(u.item.cmd_text.grep_overflow);
            continue;
          }
        }
      } else {
        u.item.fire_event(t, "unreadable");
      }
      d = l.split("\n");
      var p = d.filter(function (e) {
        return e.indexOf(r) >= 0;
      });
      if (p.length > 0) {
        i.push(p.join("\n"));
      }
    } else {
      i.push(_("item_not_exists", [u.toString()]));
    }
  }
  return i.join("\n");
});
_setupCommand("touch", null, [ARGT.filenew], function (e, t) {
  var n = t.getContext();
  if (e.length < 1) {
    return _("cmd_touch_nothing");
  }
  var r = "";
  for (var o = e.length - 1; o >= 0; o--) {
    if (n.getItemFromName(e[o])) {
      return _("tgt_already_exists", [e[o]]);
    }
    if (e[o].length > 0) {
      n.addItem(new Item(e[o], _("item_intro", [e[o]])));
      r += e[o];
      n.fire_event(t, "touch", e, o);
    }
  }
  if (r === "") {
    return _("cmd_touch_none");
  } else {
    return _("cmd_touch_created", [r]);
  }
});
_setupCommand("mkdir", null, [ARGT.dirnew], function (e, t) {
  var n = t.getContext();
  if (e.length === 1) {
    var r = n.traversee(e[0]);
    if (r.room.writable) {
      if (r.item) {
        return _("tgt_already_exists", [e[0]]);
      } else {
        r.room.addPath(new Room(r.item_name, undefined, undefined, {
          writable: true
        }));
        n.fire_event(t, "mkdir", e, 0);
        return _("room_new_created", e);
      }
    } else {
      return _("permission_denied") + " " + _("room_not_writable");
    }
  }
  return _("incorrect_syntax");
});
_setupCommand("unzip", null, [ARGT.file.concat(["*.zip"])], function (e, t) {
  var n = t.getContext();
  if (e.length === 1) {
    var r = n.traversee(e[0]);
    if (r.item && r.room.writable) {
      r.item.fire_event(t, "unzip", e, 0);
      return "";
    } else {
      return _("item_cmd_unknow", "unzip");
    }
  }
  return _("incorrect_syntax");
});
PlatformGrid.prototype.check = function (e, t, n, r) {
  var o = this;
  var i = false;
  if (e >= o.range[0][0] && t >= o.range[1][0] && e + n <= o.range[0][1] && t + r <= o.range[1][1]) {
    var s = Math.floor(t / o.y);
    var a = Math.floor(e / o.x);
    var u = Math.floor((t + r) / o.y);
    var l = Math.floor((e + n) / o.x);
    if (s >= 0 && a >= 0 && s < o.matrix.length) {
      i = true;
      for (var d = s; d <= u; d++) {
        for (var c = a; c <= l; c++) {
          i = i && o.matrix[d][c] == 0;
        }
      }
    }
  }
  return i;
};
PicLayers.prototype = {
  _setOffset: function (e, t) {
    var n = this;
    var r = n.offset_prop;
    var o = !r.grid || r.grid.check(e, t, n.cont.offsetWidth * 100 / n.cont.parentNode.offsetWidth, 0);
    return !!o && (n.offset = [e, t], n.cont.setAttribute("style", r.prop[0] + ":" + n.offset[0] + r.unit[0] + ";" + r.prop[1] + ":" + n.offset[1] + r.unit[1] + ";"), n.cont.className = "layers " + n.image_class + n.othercls + (n.reverseX ? " reverseX" : "") + (n.reverseY ? " reverseY" : ""), n.gravity && !n.falling && n.gravity(), true);
  },
  collide: function (e) {
    var t = this;
    var n = t.cont.parentNode.offsetWidth;
    var r = t.cont.parentNode.offsetHeight;
    var o = t.offset[0];
    var i = t.offset[1];
    var s = t.cont.offsetHeight * 100 / r;
    var a = t.cont.offsetWidth * 100 / n;
    var u = e.offset[0];
    var l = e.offset[1];
    var d = e.cont.offsetHeight * 100 / r;
    var c = e.cont.offsetWidth * 100 / n;
    return o < u + c && o + a > u && i < l + d && s + i > l;
  },
  setPlatformGrid: function (e, t) {
    this.offset_prop.grid = new PlatformGrid(e, t || this.offset_prop.range);
  },
  getPlatformGrid: function (e) {
    return this.offset_prop.grid;
  },
  fallTo: function (e, t, n, r) {
    var o;
    var i;
    var s;
    var a;
    var u = this;
    u.offset_prop;
    var l = t[1] < 0;
    if (!u.falling || t[1] == 0) {
      u.falling = true;
      function d() {
        if (t[0] || t[1]) {
          o = u.offset[0] + t[0];
          i = u.offset[1] + t[1];
          nowall = u._setOffset(o, i);
          s = t[0] != 0 && Math.sign(t[0]) * o < e[0];
          a = t[1] != 0 && Math.sign(t[1]) * i < e[1];
          if (!nowall) {
            nowall = u._setOffset(u.offset[0], i);
            if (nowall) {
              t[0] = 0;
              s = false;
            }
          }
          if (!nowall) {
            nowall = u._setOffset(o, u.offset[1]);
            if (nowall) {
              t[1] = 0;
              a = false;
            }
          }
          if (nowall && (a || s)) {
            setTimeout(d, n);
          } else {
            u.falling = false;
            if (r) {
              r(u, o, i);
            }
            if (u.gravity && !l) {
              u.gravity();
            }
          }
        }
      }
      d();
    }
  },
  fallToY: function (e, t, n, r) {
    this.fallTo([this.offset[0], e], [0, t], n, r);
  },
  fallToX: function (e, t, n, r) {
    this.fallTo([e, this.offset[1]], [t, 0], n, r);
  },
  setOffsetProp: function (e) {
    this.offset_prop = union(this.offset_prop, e);
  },
  setOffset: function (e) {
    return this._setOffset(e[0], e[1]);
  },
  setOffsetDelta: function (e, t) {
    var n = this;
    t *= n.gravity_coef;
    return n._setOffset(n.offset[0] + e, n.offset[1] + t);
  },
  setOffsetDeltaX: function (e) {
    var t = this;
    return t._setOffset(t.offset[0] + e, t.offset[1]);
  },
  setOffsetDeltaY: function (e) {
    var t = this;
    e *= t.gravity_coef;
    return t._setOffset(t.offset[0], t.offset[1] + e);
  },
  setOffsetDeltaXStepped: function (e, t, n, r) {
    var o = this;
    o.fallTo([o.offset[0] + e, o.offset[1]], [t, 0], n, r);
  },
  setOffsetDeltaYStepped: function (e, t, n, r) {
    var o = this;
    e *= o.gravity_coef;
    o.fallTo([o.offset[0], o.offset[1] + e], [0, t], n, r);
  },
  getOffset: function () {
    return this.offset;
  },
  getOffsetProp: function () {
    return this.offset_prop;
  },
  update: function () {
    var e = this;
    var t = e.cont;
    var n = e.onload;
    t.innerHTML = "";
    t.className = "layers " + e.pic.image_class + " " + e.othercls + (e.reverseX ? " reverseX" : "") + (e.reverseY ? " reverseY" : "");
    var r = addEl(t, "div", {
      class: "foreground",
      "aria-hidden": "true"
    });
    var o = addEl(t, "div", {
      class: "background",
      "aria-hidden": "true"
    });
    if (e.pic.src) {
      addEl(t, "img", {
        class: "main " + (e.pic.cls || "") + " " + (e.pic.tmpcls || ""),
        src: e.pic.img_dir + e.pic.src,
        "aria-hidden": "true"
      }).onload = n;
      delete e.pic.tmpcls;
    }
    var i = 0;
    for (var s in e.pic.children) {
      if (e.pic.children.hasOwnProperty(s)) {
        var a = e.pic.children[s];
        if (a.render_as_child(a.index < 0 ? o : r, i + 1)) {
          i++;
        }
      }
    }
  }
};
Pic.prototype = {
  set: function (e) {
    this.src = e;
  },
  setOneShotRenderClass: function (e) {
    this.tmpcls = e;
  },
  setImgClass: function (e) {
    this.image_class = e;
  },
  copy: function (e) {
    return new Pic(this.src, {
      img_dir: this.img_dir,
      cls: this.cls,
      shown_in_ls: this.shown_in_ls,
      image_class: this.image_class,
      children: clone(this.children)
    });
  },
  addChildren: function (e) {
    for (var t in e) {
      if (e.hasOwnProperty(t)) {
        this.children[t] = e[t];
      }
    }
  },
  setChild: function (e, t, n) {
    var r = !this.children.hasOwnProperty(e);
    this.children[e] = isStr(t) ? new Pic(t, union(n, {
      cls: "livelayer"
    })) : t;
    return r;
  },
  unsetChild: function (e) {
    delete this.children[e];
  },
  exists: function () {
    return this.src || this.children.length;
  },
  render_as_child: function (e, t) {
    if (this.src) {
      addEl(e, "img", {
        class: "layer layer-" + t + " " + (this.cls || "") + " " + (this.tmpcls || ""),
        src: this.img_dir + this.src,
        "aria-hidden": "true"
      });
      for (var n in this.children) {
        if (this.children.hasOwnProperty(n)) {
          var r = this.children[n];
          r.render_as_child(e, t);
        }
      }
      delete this.tmpcls;
      return true;
    }
    return false;
  },
  render: function (e, t) {
    var n = this;
    if (n.exists()) {
      var r = addEl(e, "div", "layers");
      r.onload = t;
      var o = new PicLayers(n, r, t);
      o.update();
      return o;
    }
    return null;
  }
};
var global_uid = {};
File.prototype = union(EventTarget.prototype, {
  toString: function () {
    return this.name;
  },
  chmod: function (e) {
    this.readable = d(e.read, this.readable);
    this.executable = d(e.exec, this.readable);
    this.writable = d(e.write, this.readable);
    return this;
  },
  setReadable: function (e) {
    this.readable = d(e.read, this.readable);
    return this;
  },
  setWritable: function (e) {
    this.writable = d(e.write, this.readable);
    return this;
  },
  setExecutable: function (e) {
    this.executable = d(e.exec, this.readable);
    return this;
  },
  getName: function () {
    return this.name;
  },
  setName: function (e) {
    this.name = e;
    return this;
  },
  getPic: function () {
    return this.picture;
  },
  setPic: function (e) {
    this.picture.set(e);
  },
  unsetCmdEvent: function (e) {
    delete this.cmd_event[e];
    return this;
  },
  setCmdEvent: function (e, t) {
    this.cmd_event[e] = t || e;
    return this;
  },
  setCmdEvents: function (e) {
    for (var t in e) {
      if (e.hasOwnProperty(t)) {
        this.setCmdEvent(t, e[t]);
      }
    }
    return this;
  },
  setCmdText: function (e, t) {
    this.cmd_text[e] = t;
    return this;
  },
  unsetCmdText: function (e) {
    delete this.cmd_text[e];
    return this;
  },
  addState: function (e, t) {
    e = this.uid + e;
    this.addListener(e, state.Event);
    state.add(e, t);
    return this;
  },
  addStates: function (e) {
    if (isObj(e)) {
      for (var t in e) {
        if (e.hasOwnProperty(t)) {
          name = this.uid + t;
          this.addListener(name, state.Event);
          state.add(name, e[t]);
        }
      }
    } else {
      console.error("addStates shall receive a dictionnary {} as argument, if you want to declare only on state us addState");
    }
    return this;
  },
  apply: function (e) {
    this.fire(this.uid + e);
    return this;
  }
});
Item.prototype = union(File.prototype, {
  addPicMod: function (e, t, n) {
    var r = new Pic(t, n);
    this.picture.setChild(e, r);
    return this;
  },
  rmPicMod: function (e, t) {
    this.picture.unsetChild(e, newpic);
    return this;
  },
  copy: function (e) {
    var t = new Item(e);
    t.picture = this.picture.copy();
    t.cmd_text = clone(this.cmd_text);
    t.valid_cmds = clone(this.valid_cmds);
    t.cmd_event = clone(this.cmd_event);
    t._listeners = clone(this._listeners);
    t.room = this.room;
    t.people = this.people;
    t.poprefix = this.poprefix;
    return t;
  },
  setExecFunction: function (e) {
    this.exec_function = e;
  },
  unsetExecFunction: function () {
    this.exec_function = undefined;
  },
  exec: function (e, t, n) {
    var r = this;
    this.fire_event(n, "exec", e);
    if (this.exec_function) {
      return this.exec_function(this, e, t, n);
    } else {
      return cmd_done(n, [[r, 0]], "", "exec", e);
    }
  },
  setPo: function (e, t) {
    this.poid = this.poprefix + e;
    this.povars = t;
    this.name = _(this.poid, t);
    this.cmd_text.less = _(this.poid + POSUFFIX_DESC, t);
    return this;
  },
  checkTextIdx: function (e) {
    return dialog.hasOwnProperty(this.poid + POSUFFIX_DESC + e);
  },
  setTextIdx: function (e, t) {
    this.cmd_text.less = _(this.poid + POSUFFIX_DESC + e, t, {
      or: this.poid + POSUFFIX_DESC
    });
    return this;
  },
  setPoDelta: function (e) {
    if (typeof e == "string") {
      this.poid += e;
    } else {
      this.povars = e;
    }
    this.name = _(this.poid, this.povars);
    this.cmd_text.less = _(this.poid + POSUFFIX_DESC, this.povars);
    return this;
  },
  fire_event: function (e, t, n, r) {
    var o = null;
    var i = {
      term: e,
      room: this.room,
      item: this,
      arg: def(r) ? n[r] : null,
      args: n,
      i: r
    };
    if (t in this.cmd_event) {
      console.log(this.uid + " EVENT " + t);
      o = this.cmd_event[t];
    }
    if (o) {
      var s = typeof o == "function" ? o(i) : o;
      if (s) {
        console.log(this.uid + " FIRE " + s);
        this.fire(this.uid + s);
      }
    }
  },
  disappear: function () {
    this.room.removeItemByName(this.name);
  },
  moveTo: function (e) {
    this.room.removeItemByName(this.name);
    e.addItem(this);
    return this;
  }
});
People.prototype = Item.prototype;
var regexp_str = /^['"].*['"]$/;
var regexp_star = /.*\*.*/;
var global_spec = {};
Room.prototype = union(File.prototype, {
  fire_event: function (e, t, n, r, o) {
    o = d(o, {});
    var i = null;
    var s = {
      term: e,
      room: this,
      arg: def(r) ? n[r] : null,
      args: n,
      i: r,
      ct: o
    };
    if (o.hasOwnProperty("unreachable_room")) {
      if (o.unreachable_room.name in global_spec && t in global_spec[o.unreachable_room.name]) {
        i = global_spec[o.unreachable_room.name][t];
      }
    } else if (t in this.cmd_event) {
      i = this.cmd_event[t];
    }
    if (i) {
      var a = typeof i == "function" ? i(s) : i;
      if (a) {
        this.fire(this.uid + a);
      }
    }
  },
  setIntroText: function (e) {
    this.intro_text = e;
    return this;
  },
  addCommand: function (e) {
    this.suggestions.push(e);
    return this;
  },
  removeCommand: function (e) {
    rmIdxOf(this.suggestions, e);
  },
  checkTextIdx: function (e) {
    return dialog.hasOwnProperty(this.poid + POSUFFIX_DESC + e);
  },
  setTextIdx: function (e, t) {
    this.intro_text = _(this.poid + POSUFFIX_DESC + e, t, {
      or: this.poid + POSUFFIX_DESC
    });
    return this;
  },
  setEnterCallback: function (e) {
    this.enter_callback = e;
    return this;
  },
  setLeaveCallback: function (e) {
    this.leave_callback = e;
    return this;
  },
  getStarterMsg: function (e) {
    e = e || "";
    if (this.starter_msg) {
      return e + this.starter_msg;
    } else {
      return e + _(POPREFIX_CMD + "pwd", [this.name]).concat("\n").concat(this.intro_text);
    }
  },
  setStarterMsg: function (e) {
    this.starter_msg = e;
    return this;
  },
  addItem: function (e) {
    pushDef(e, this.items);
    e.room = this;
    return this;
  },
  newItem: function (e, t, n) {
    n = d(n, {});
    n.poid = d(n.poid, e);
    var r = new Item("", "", t, n);
    this.addItem(r);
    return r;
  },
  newPeople: function (e, t, n) {
    n = d(n, {});
    n.poid = d(n.poid, e);
    var r = new People("", "", t, n);
    this.addItem(r);
    return r;
  },
  newItemBatch: function (e, t, n, r) {
    var o = [];
    r = d(r, {});
    for (var i = 0; i < t.length; i++) {
      r.poid = e;
      r.povars = [t[i]];
      o[i] = new Item("", "", n, r);
      this.addItem(o[i]);
    }
    return o;
  },
  removeItemByIdx: function (e) {
    if (e == -1) {
      return null;
    } else {
      return this.items.splice(e, 1)[0];
    }
  },
  removeItemByName: function (e) {
    idx = this.idxItemFromName(e);
    return this.removeItemByIdx(idx);
  },
  hasItem: function (e, t) {
    t = t || [];
    idx = this.idxItemFromName(_(POPREFIX_ITEM + e, t));
    return idx > -1;
  },
  removeItem: function (e, t) {
    t = t || [];
    idx = this.idxItemFromName(_(POPREFIX_ITEM + e, t));
    return this.removeItemByIdx(idx);
  },
  hasPeople: function (e, t) {
    t = t || [];
    idx = this.idxItemFromName(_(POPREFIX_PEOPLE + e, t));
    return idx > -1;
  },
  removePeople: function (e, t) {
    t = t || [];
    idx = this.idxItemFromName(_(POPREFIX_PEOPLE + e, t));
    return this.removeItemByIdx(idx);
  },
  idxItemFromName: function (e) {
    return this.items.map(objToStr).indexOf(e);
  },
  idxChildFromName: function (e) {
    return this.children.map(objToStr).indexOf(e);
  },
  getItemFromName: function (e) {
    idx = this.idxItemFromName(e);
    if (idx == -1) {
      return null;
    } else {
      return this.items[idx];
    }
  },
  getItem: function (e) {
    return this.getItemFromName(_("item_" + e));
  },
  getChildFromName: function (e) {
    idx = this.children.map(objToStr).indexOf(e);
    if (idx == -1) {
      return null;
    } else {
      return this.children[idx];
    }
  },
  hasChild: function (e) {
    idx = this.children.map(objToStr).indexOf(e.name);
    if (idx == -1) {
      return null;
    } else {
      return this.children[idx];
    }
  },
  addPath: function (e, t) {
    if (def(e) && !this.hasChild(e)) {
      this.children.push(e);
      if (d(t, true)) {
        e.parents.push(this);
        e.isRoot = false;
      }
    }
    return this;
  },
  doLeaveCallbackTo: function (e) {
    t = this;
    if (t.uid === e.uid) ;else if (t.parents.length) {
      var n = t.parents[0];
      if (typeof t.leave_callback == "function") {
        t.leave_callback();
      }
      if (n) {
        n.doLeaveCallbackTo(e);
      }
    }
  },
  hasParent: function (e, t) {
    t = d(t, false);
    var n = false;
    for (var r = this.parents, o = 0; o < (t ? r.length : r.length ? 1 : 0); o++) {
      n = r[o].uid == e.uid || n || r[o].hasParent(e);
    }
    return n;
  },
  removeParentPath: function (e) {
    rmIdxOf(this.parents, e);
  },
  removePath: function (e) {
    if (rmIdxOf(this.children, e)) {
      rmIdxOf(e.parents, this);
    }
  },
  setOutsideEvt: function (e, t) {
    global_spec[this.name][e] = t;
    return this;
  },
  unsetOutsideEvt: function (e) {
    delete global_spec[this.name][e];
    return this;
  },
  can_cd: function (e) {
    if (e === "~") {
      return $home;
    }
    if (e === "..") {
      return this.parents[0];
    }
    if (e === ".") {
      return this;
    }
    if (e && e.indexOf("/") == -1) {
      for (var t = this.children, n = 0; n < t.length; n++) {
        if (e === t[n].toString()) {
          return t[n];
        }
      }
    }
    return null;
  },
  traversee: function (e) {
    var t = this.pathToRoom(e);
    var n = {
      room: t[0],
      item_name: t[1],
      item_idx: -1
    };
    if (n.room && (n.room_name = n.room.name, n.item_name)) {
      for (i = 0; i < n.room.items.length; i++) {
        if (n.item_name === n.room.items[i].toString()) {
          n.item = n.room.items[i];
          n.item_idx = i;
          break;
        }
      }
    }
    return n;
  },
  pathToRoom: function (e) {
    for (var t = e.split("/"), n = this, r = null, o = true, i = "", s = 0; s < t.length - 1 && n && n.executable; s++) {
      n = n.can_cd(t[s]);
      if (n) {
        i += (s > 0 ? "/" : "") + t[s];
      }
    }
    if (n) {
      r = t[t.length - 1];
      o = n.can_cd(r);
      if (o) {
        n = o;
        i += (s > 0 ? "/" : "") + r + "/";
        r = null;
      }
    }
    return [n, r, i];
  }
});
var state = new GameState();
var vt;
var snd = new SoundBank();
var music = new Music(snd);
user.name = "Sure";
user.address = "DTC";
snd.set("choicemove", "./snd/sfx_movement_ladder5a.", ["wav"]);
snd.set("choiceselect", "./snd/sfx_movement_ladder2a.", ["wav"]);
snd.set("tag", "./snd/sfx_movement_ladder2a.", ["wav"]);
snd.set("char", "./snd/char.", ["wav"]);
snd.set("grl", "./snd/grl.", ["wav"]);
snd.set("poney", "./snd/sfx_menu_move3.", ["wav"]);
snd.set("portal", "./snd/sfx_movement_portal6.", ["wav"]);
snd.set("learned", "./snd/sfx_sounds_fanfare3.", ["wav"]);
snd.set("unlocked", "./snd/sfx_sounds_fanfare3.", ["wav"]);
snd.set("success", "./snd/snd_5000points.", ["mp3"]);
snd.set("broken", "./snd/sfx_exp_cluster9.", ["wav"]);
snd.set("hit", "./snd/sfx_menu_move3.", ["wav"]);
snd.set("poweron", "./snd/snd_steel.", ["mp3"]);
music.set("chapter2", "./music/place/slowdrum-cave.", ["wav"]);
music.set("academy", "./music/mystic/caravan.", ["ogg"]);
music.set("battle", "./music/danger/snd__bairustage_loop.", ["mp3"]);
music.set("warning", "./music/danger/trolls-beatdown-05l.", ["wav"]);
music.set("story", "./music/cave/Searching.", ["ogg"]);
music.set("forest", "./music/nature/Forest_Ambience.", ["mp3"]);
music.set("yourduty", "./music/Intro_Theme.", ["mp3"]);
music.set("title", "./music/Intro_Theme.", ["mp3"]);
music.set("trl", "./music/danger/trolls-beatdown-05l.", ["wav"]);
var loadel;
var game_version = "0.1beta";
var cookie_version = "terminus" + game_version;
newRoom("home", undefined, {
  writable: true
});
state.setCurrentRoom($home);
$home.setEnterCallback(function () {
  music.play("forest");
});
$home.setCmdEvent("cmd_not_found", "hnotf").setCmdEvent("less_no_arg", "hnoarg").setCmdEvent("destination_unreachable", "hnodest").addStates({
  hnotf: function (e) {
    if (!e) {
      setTimeout(function () {
        vt.unmuteSound();
        mesg(_("very_first_try"), e);
        vt.unmuteCommandResult();
        $home.unsetCmdEvent("cmd_not_found");
        setTimeout(function () {
          vt.show_img();
          global_fire_done();
          state.saveCookie();
        }, 1300);
      }, 1000);
    }
  },
  hnoarg: cat_first_try,
  hnodest: cat_second_try
});
var shell_txt_id = 0;
shelly = $home.newPeople("shell").setCmdEvent("less_done", "chtxt").setCmdEvent("exec_done", "chtxt").addStates({
  chtxt: shell_dial
});
$home.addPath(newRoom("western_forest", "loc_forest.gif").setEnterCallback(function () {
  music.play("forest");
}));
$western_forest.newItem("western_forest_academy_direction", "item_sign.png");
var pwddecl = $western_forest.newItem("western_forest_back_direction").setCmdEvent("less", "pwdCmd").addStates({
  pwdCmd: function (e) {
    $western_forest.unsetCmdEvent("less");
    if (!_hasGroup("pwd")) {
      _addGroup("pwd");
      learn(vt, "pwd", e);
    }
  }
});
$western_forest.addPath(newRoom("spell_casting_academy", "loc_academy.gif").setEnterCallback(function () {
  music.play("academy");
}));
$spell_casting_academy.addPath(newRoom("lessons", "loc_classroom.gif"));
var prof = $lessons.newPeople("professor", "item_professor.png").setCmdEvent("less", "learn_mv").addState("learn_mv", function (e) {
  prof.unsetCmdEvent("less");
  _addGroup("mv");
  learn(vt, "mv", e);
});
$spell_casting_academy.addPath(newRoom("academy_practice", "loc_practiceroom.png", {
  writable: true
}));
$academy_practice.newItem("academy_practice", "item_manuscript.png");
$academy_practice.addPath(newRoom("box", "item_box.png", {
  writable: true
}).setEnterCallback(function (e, t) {
  enterRoom(e.parents[0], t);
}));
var mv_pr_sum = 0;
$academy_practice.newItemBatch("practice", [1, 2, 3], "item_test.png").map(function (e) {
  e.setCmdEvent("mv").addState("mv", mv_sum);
});
man_sage = newRoom("mountain", "loc_mountains.gif").newPeople("man_sage", "item_mysteryman.png");
man_sage.setCmdEvent("less", "exitCmd").addStates({
  exitCmd: function (e) {
    man_sage.unsetCmdEvent("less");
    _addGroup("exit");
    learn(vt, ["exit"], e);
    man = $mountain.newItem("man", "item_manuscript.png");
    man.setCmdEvent("less", "manCmd").addStates({
      manCmd: function (e) {
        man.unsetCmdEvent("less");
        _addGroup("help");
        learn(vt, ["man", "help"], e);
      }
    }).setCmdEvent("less_done", "trueStart").addStates({
      trueStart: function (e) {
        man.unsetCmdEvent("less_done");
        music.play("yourduty", {
          loop: true
        });
      }
    });
  }
});
man_sage.setCmdEvent("less_done", "manLeave").addStates({
  manLeave: function (e) {
    man_sage.disappear();
  }
});
var poney_txt_id = 1;
$home.addPath(newRoom("meadow", "loc_meadow.gif"));
var poney = $meadow.newPeople("poney", "item_fatpony.png").setCmdEvent("less", "add_mountain").setCmdEvent("less_done", "uptxt").addStates({
  add_mountain: function (e) {
    $meadow.addPath($mountain);
    mesg(_("new_path", [$mountain]), e, {
      timeout: 600,
      ondone: true
    });
    unlock(vt, $mountain, e);
    poney.unsetCmdEvent("less");
  },
  uptxt: poney_dial,
  uptxthint: poney_dialhint
});
$mountain.addPath(newRoom("cave", "loc_cave.gif").addPath(newRoom("dark_corridor", "loc_corridor.gif")));
$dark_corridor.addPath(newRoom("dank", "loc_darkroom.gif", {
  writable: true
}).addCommand("mv").addPath(newRoom("small_hole", undefined, {
  writable: true
}).setCmdText("cd", _("room_small_hole_cd"))));
var boulder = $dank.newItem("boulder", "item_boulder.png", {
  cls: "large"
}).setCmdEvent("mv", "mvBoulder").addStates({
  mvBoulder: function (e) {
    if (!$dank.hasChild($tunnel)) {
      $dank.addPath($tunnel);
      unlock(vt, $tunnel, e);
      if (e) {
        $dank.getItem("boulder").moveTo($small_hole);
      }
    }
  }
});
var rat_txtidx = 1;
newRoom("tunnel", "loc_tunnel.gif").addPath(newRoom("stone_chamber", "loc_portalroom.gif").addPath(newRoom("portal", "item_portal.png").setEnterCallback(function () {
  vt.playSound("portal");
  music.play("chapter1");
})));
var rat = $tunnel.newPeople("rat", "item_rat.png", {
  pic_shown_in_ls: false
}).setCmdEvent("less_done", "idRat").addStates({
  idRat: function (e) {
    rat.setCmdEvent("less_done", "ratDial");
    rat.setPoDelta("_identified");
  },
  ratDial: function (e) {
    rat.setTextIdx(rat_txtidx++);
  }
});
$portal.addPath(newRoom("townsquare", "loc_square.gif"));
$townsquare.setEnterCallback(function () {
  music.play("chapter2", {
    loop: true
  });
});
var mayor_txtidx = 1;
var mayor = $townsquare.newPeople("citizen1", "item_citizen1.png").setCmdEvent("less_done", "id").addStates({
  id: function (e) {
    mayor.setCmdEvent("less_done", "talk");
    mayor.setPoDelta("_");
  },
  talk: function (e) {
    mayor.setTextIdx(mayor_txtidx++);
  }
});
$townsquare.newPeople("citizen2", "item_citizen2.png");
var lady_txtidx = 1;
var lady = $townsquare.newPeople("citizen3", "item_lady.png").setCmdEvent("less_done", "talk").addStates({
  talk: function (e) {
    lady.setTextIdx(lady_txtidx++);
  }
});
var disabled_sell_choices = [];
$townsquare.addPath(newRoom("market", "loc_market.gif", {
  writable: true
}).addCommand("touch"));
vendor = $market.newPeople("vendor", "item_merchant.png").setCmdText("less", "").setCmdEvent("less_done", function () {
  vt.show_img();
  vt.ask_choose(_("people_vendor_text"), [_("people_vendor_sell_mkdir"), _("people_vendor_sell_rm"), _("people_vendor_sell_nothing")], buy_to_vendor, {
    disabled_choices: disabled_sell_choices
  });
});
var backpack = $market.newItem("backpack", "item_backpack.png").setCmdEvent("mv", function (e) {
  vt.show_msg(_("item_backpack_stolen"));
  backpack.unsetCmdEvent("mv");
}).setCmdEvent("less").addStates({
  less: function (e) {
    _addGroup("unzip");
    learn(vt, "unzip", e);
    backpack.unsetCmdEvent("less");
    backpack.setPoDelta([".zip"]);
    backpack.setCmdEvent("unzip", function (e) {
      unzipped = [];
      unzipped.push(e.room.newItem("rm_cost"));
      unzipped.push(e.room.newItem("mkdir_cost"));
      backpack.setPoDelta([]);
      backpack.unsetCmdEvent("unzip");
      vt.show_msg(_("unzipped", [_("item_backpack"), unzipped.join(", ")]), {
        dependant: false
      });
    });
  }
});
$market.addStates({
  rmSold: function (e) {
    _addGroup("rm");
    learn(vt, "rm", e);
    $market.removeItem("rm_spell");
    disabled_sell_choices.push(1);
    vendor.setCmdText("rm", _("people_vendor_rm"));
    global_fire_done();
  },
  mkdirSold: function (e) {
    _addGroup("mkdir");
    learn(vt, "mkdir", e);
    disabled_sell_choices.push(0);
    $market.removeItem("mkdir_spell");
    global_fire_done();
  }
});
$market.newItem("rm_spell", "item_manuscript.png");
$market.newItem("mkdir_spell", "item_manuscript.png");
$townsquare.addPath(newRoom("library", "loc_library.gif").addCommand("grep"));
lever = $library.newItem("lever", "item_lever.png", {
  executable: true
}).setCmdEvent("exec", "pullLever").addStates({
  pullLever: function (e) {
    $library.addPath($backroom);
    if (!e) {
      vt.show_msg(_("item_lever_exec"));
    }
    lever.disappear();
  }
});
$library.newItem("historybook", "item_historybook.png");
$library.newItem("nostalgicbook", "item_historybook.png").setCmdEvent("less", "pwdCmd").addStates({
  pwdCmd: function (e) {
    $western_forest.fire_event("pwdCmd");
  }
});
$library.newItem("romancebook", "item_romancenovel.png");
$library.newItem("itemspellbook", "item_radspellbook.png");
$library.newItem("radspellbook", "item_radspellbook.png");
vimbook = $library.newItem("vimbook", "item_vimbook.png").setCmdEvent("less", "openVim").addState("openVim", function (e) {
  if (!e) {
    vt.flash(1600, 1000);
    vt.rmCurrentImg(2650);
  }
  vimbook.disappear();
});
newRoom("backroom", "loc_backroom.gif").addCommand("grep");
$backroom.newPeople("grep", "grep.png").setCmdEvent("less", "grep").addStates({
  grep: function (e) {
    _addGroup("grep");
    learn(vt, "grep", e);
  }
});
$backroom.newPeople("librarian", "item_librarian.png");
$townsquare.addPath(newRoom("rockypath", "loc_rockypath.gif", {
  writable: true
}));
$rockypath.newItem("largeboulder", "item_boulder.png").setCmdText("rm", _("item_largeboulder_rm")).setCmdEvent("rm").addStates({
  rm: function (e) {
    $rockypath.addPath($farm);
    if (e && e) {
      $rockypath.removeItem("largeboulder");
    }
  }
});
$townsquare.addPath(newRoom("artisanshop", "loc_artisanshop.gif").setCmdEvents({
  touch: function (e) {
    if (e.arg === _("item_gear")) {
      return "touchGear";
    }
  },
  cp: function (e) {
    var t = new RegExp(_("item_gear") + "\\d");
    if (t.test(e.arg)) {
      for (var n = 1; n < 6; n++) {
        if (!e.room.getItemFromName(_("item_gear", [n]))) {
          return "";
        }
      }
      return "FiveGearsCopied";
    }
  }
}, true).addStates({
  touchGear: function (e) {
    Artisan.setCmdText("less", _("item_gear_touch"));
    $artisanshop.addCommand("cp");
    _addGroup("cp");
    learn(vt, "cp", e);
    if (e) {
      $artisanshop.newItem("gear", "item_gear.png");
    } else {
      $artisanshop.getItem("gear").setPic("item_gear.png");
    }
    state.saveCookie();
  },
  FiveGearsCopied: function (e) {
    Artisan.setCmdText("less", _("item_gear_artisans_ok"));
    $artisanshop.removeItem("gear");
    if (!e) {
      $artisanshop.removeItem("gear", [1]);
      $artisanshop.removeItem("gear", [2]);
      $artisanshop.removeItem("gear", [3]);
      $artisanshop.removeItem("gear", [4]);
      $artisanshop.removeItem("gear", [5]);
      success(vt, "room_artisanshop", e);
    }
    state.saveCookie();
  }
}));
$artisanshop.newItem("strangetrinket", "item_trinket.png").setCmdText("rm", _("item_strangetrinket_rm")).setCmdText("mv", _("item_strangetrinket_mv"));
$artisanshop.newItem("dragon", "item_clockdragon.png", {
  pic_shown_in_ls: false
}).setCmdText("rm", _("item_dragon_rm")).setCmdText("mv", _("item_dragon_mv"));
var Artisan = $artisanshop.newPeople("artisan", "item_artisan.png").setCmdEvent("less", "touch").addStates({
  touch: function (e) {
    _addGroup("touch");
    learn(vt, "touch", e);
    Artisan.unsetCmdEvent("less");
    state.saveCookie();
  }
});
newRoom("farm", "loc_farm.gif").addCommand("cp").newItem("earofcorn", "item_corn.png").setCmdText("rm", _("item_earofcorn_rm")).setCmdEvent("cp", "CornCopied").addStates({
  CornCopied: function (e) {
    Farmer.setCmdText("less", _("corn_farmer_ok"));
    if (e) {
      $farm.newItem("another_earofcorn");
    }
  }
});
var Farmer = $farm.newPeople("farmer", "item_farmer.png");
$townsquare.addPath(newRoom("brokenbridge", "loc_bridge.gif").setCmdEvent("touch", function (e) {
  if (e.arg === _("item_plank")) {
    return "touchPlank";
  } else {
    return "";
  }
}).addCommand("touch").addStates({
  touchPlank: function (e) {
    $clearing.addCommand("cd");
    $clearing.unsetCmdText("cd");
    $clearing.setExecutable(true);
    $brokenbridge.unsetCmdText("cd");
    $brokenbridge.setIntroText(_("room_brokenbridge_text2"));
    if (e) {
      $brokenbridge.newItem("plank", "item_plank.png");
    } else {
      $brokenbridge.getItem("plank").setPic("item_plank.png");
      vt.echo(_("room_brokenbridge_text2"));
    }
  }
}));
$brokenbridge.addPath(newRoom("clearing", "loc_clearing.gif", {
  writable: true,
  executable: false
}).setCmdEvent("mkdir", function (e) {
  if (e.arg == _("room_house")) {
    return "HouseMade";
  } else {
    return "";
  }
}).setCmdText("cd", _("room_clearing_cd")).addCommand("mkdir").addStates({
  HouseMade: function (e) {
    if (e) {
      $clearing.addPath(newRoom("house"));
    }
    $clearing.getChildFromName(_("room_house")).setCmdText("cd", _("room_house_cd")).setCmdText("ls", _("room_house_ls"));
    success(vt, "room_house", e);
    $clearing.unsetCmdText("cd");
    $clearing.setIntroText(_("room_clearing_text2"));
    CryingMan.setCmdText("less", _("room_clearing_less2"));
  }
}));
var CryingMan = $clearing.newPeople("cryingman", "item_man.png");
$clearing.addPath(newRoom("ominouspath", "loc_path.gif", {
  writable: true
}));
$ominouspath.newItem("brambles", "item_brambles.png", {
  cls: "large"
}).setCmdEvent("rm", "rmBrambles").setCmdText("mv", _("item_brambles_mv")).setCmdText("rm", _("item_brambles_rm")).addStates({
  rmBrambles: function (e) {
    $ominouspath.addPath($trollcave);
    if (e) {
      $ominouspath.removeItem("brambles");
    }
  }
});
function troll_evt(e) {
  if (e.arg == "UglyTroll") {
    return "openSlide";
  } else {
    return "";
  }
}
newRoom("trollcave", "loc_cave.gif", {
  writable: true
}).setCmdEvent("mv", troll_evt).setCmdEvent("rm", troll_evt);
$trollcave.newPeople("troll1", "item_troll1.png").setCmdText("rm", _("people_troll1_rm")).setCmdText("mv", _("people_troll1_mv")).setCmdText("cp", _("people_troll1_cp")).setCmdEvent("mv", "openSlide").setCmdEvent("rm", "openSlide").addStates({
  openSlide: function (e) {
    $slide.addCommand("cd");
    $slide.setExecutable(true);
    $slide.setCmdText("cd", _("room_slide_cd2"));
    if (e) {
      $trollcave.removePeople("troll1");
    }
  }
});
$trollcave.newPeople("troll2", "item_troll2.png").setCmdText("rm", _("people_troll1_rm"));
$trollcave.newPeople("supertroll", "item_supertroll.png").setCmdText("rm", _("people_supertroll_rm")).setCmdText("mv", _("people_supertroll_mv"));
$trollcave.addPath(newRoom("cage", "item_cage.png", {
  cls: "covering",
  writable: true,
  executable: false,
  pic_shown_as_item: true
}).setCmdText("cd", _("room_cage_cd")));
var Kid = $cage.newPeople("kidnapped", "item_boy.png").setCmdText("mv", _("people_kidnapped_mv")).setCmdEvent("mv", "freekid").addStates({
  freeKid: function () {
    Kid.moveTo($clearing);
  }
});
$trollcave.addPath(newRoom("slide", null, {
  executable: false
}).setCmdText("cd", _("room_slide_cd")));
$slide.addPath(newRoom("kernel").addCommand("sudo").addCommand("grep"));
$kernel.newItem("certificate", undefined, {
  readable: false
}).setCmdEvent("unreadable", function (e) {
  e.term.echo(_("item_certificate_alert"));
}).setCmdEvent("less_done", "sudoComplete").addStates({
  sudoComplete: function (e) {
    $kernel.addPath($paradise);
    mesg(_("new_path", [$paradise]), e, {
      timeout: 600,
      ondone: true
    });
    unlock(vt, $paradise, e);
  }
});
$kernel.newItem("sudo_teaser").setCmdEvent("less", "sudo").addStates({
  sudo: function (e) {
    _addGroup("sudo");
    learn(vt, "sudo", e);
  }
});
$kernel.newItem("instructions");
$kernel.addPath(newRoom("morekernel").addCommand("grep"));
var $bigfiles = $morekernel.newItemBatch("bigfile", ["L", "M", "Q", "R", "S", "T", "U", "V", "W"]);
$bigfiles.filter(function (e) {
  e.setCmdText("grep_overflow", _("grep_long"));
});
$bigfiles[Math.floor(Math.random() * 9)].setCmdText("grep", "password = IHTFP");
newRoom("paradise", "loc_theend.gif").setCmdText("ls", _("room_paradise_ls")).setCmdEvent("ls_done", "gameover").addStates({
  gameover: function (e) {
    if (!e) {
      vt.echo(_("room_paradise_ls"));
    }
    mesg(_("gameover"), e, {
      timeout: 30000,
      ondone: true
    });
    mesg(_("gameover1"), e, {
      timeout: 60000,
      ondone: true
    });
    mesg(_("gameover2"), e, {
      timeout: 180000,
      ondone: true
    });
    mesg(_("gameover3"), e, {
      timeout: 196000,
      ondone: true
    });
  }
});
console.log("Game objects : init");
app_loaded();