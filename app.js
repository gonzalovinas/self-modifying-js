var recast = require("recast");
var fs = require("fs");
var numberOfTimesIWasModifiedByMyself = 7;
var ast;

try {
  var r = fs.readFileSync(__filename);
  ast = recast.parse(r);

  console.log(
    "Number Of Times I Was Modified By Myself: " + numberOfTimesIWasModifiedByMyself
  );

  for (var i = 0, src = ast.program.body; i < src.length; i++) {
    if (src[i].type == "VariableDeclaration") {
      if (src[i].declarations[0].id.name == "numberOfTimesIWasModifiedByMyself") {
        src[i].declarations[0].init.value += 1;
      }
    }
  }
} catch (e) {
  throw "cannot read myself :(";
}

try {
  var newText = recast.prettyPrint(ast, {
    tabWidth: 2
  }).code;

  fs.writeFileSync(__filename, newText);
} catch (e) {
  throw "cannot update myself :(";
}