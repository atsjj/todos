minispade.register('todos/templates/main_view', "(function() {Ember.TEMPLATES['main_view']=Ember.Handlebars.compile(\"<header>\\n  <nav class=\\\"right box\\\">\\n      <a data-icon=\\\"remove\\\" {{action clearCompletedTodos target=\\\"Todos.todosController\\\"}}></a>\\n  </nav>\\n  <div class=\\\"centered title with-subtitle\\\">\\n    Todos\\n    <small class=\\\"subtitle\\\">{{Todos.todosController.remaining}} remaining</small>\\n  </div>\\n</header>\\n<article id=\\\"main-article\\\" class=\\\"list indented scroll\\\">\\n  <form class=\\\"margined\\\" class=\\\"one row\\\" onsubmit=\\\"return false;\\\">\\n    {{view Todos.CreateTodoView id=\\\"new-todo\\\" placeholder=\\\"What needs to be done?\\\"}}\\n  </form>\\n  <div class=\\\"list indented scroll\\\">\\n    <ul>\\n    {{#each Todos.todosController}}\\n      {{#view Todos.CheckView valueBinding=\\\"isDone\\\"}}\\n        <span {{bindAttr class=\\\"view.icon\\\"}}></span>\\n        <a href=\\\"#\\\">\\n          <strong>{{title}}</strong>\\n          <small>&nbsp;</small>\\n        </a>\\n      {{/view}}\\n    {{/each}}\\n    </ul>\\n  </div>\\n  <div class=\\\"one row\\\">\\n    {{view Ember.Checkbox class=\\\"mark-all-done\\\"\\n      disabledBinding=\\\"Todos.todosController.isEmpty\\\"\\n      valueBinding=\\\"Todos.todosController.allAreDone\\\"}}\\n    <label>Mark all as done</label>\\n  </div>\\n</article>\\n<footer>\\n  <nav>\\n    <a href=\\\"#layout-art1\\\" data-router=\\\"article\\\" class=\\\"current\\\" data-icon=\\\"home\\\"></a>\\n  </nav>\\n</footer>\\n\");\n})();\n//@ sourceURL=todos/templates/main_view");minispade.register('todos/app', "(function() {minispade.require('todos/templates/main_view');\n\nTodos = Ember.Application.create();\n\nTodos.Todo = Ember.Object.extend({\n  title: null,\n  isDone: false\n});\n\nTodos.todosController = Ember.ArrayController.extend({\n  content: [],\n\n  createTodo: function(title) {\n    var todo = Todos.Todo.create({ title: title });\n    this.pushObject(todo);\n  },\n\n  clearCompletedTodos: function() {\n    this.removeObjects(this.filterProperty('isDone', true));\n  },\n\n  remaining: function() {\n    return this.filterProperty('isDone', false).get('length');\n  }.property('@each.isDone'),\n\n  isEmpty: function() {\n    return this.get('length') === 0;\n  }.property('length'),\n\n  allAreDone: function(key, value) {\n    if (arguments.length === 2) {\n      this.setEach('isDone', value);\n\n      return value;\n    } else {\n      return !this.get('isEmpty') && this.everyProperty('isDone', true);\n    }\n  }.property('@each.isDone')\n}).create();\n\nTodos.CheckView = Ember.View.extend({\n  tagName: \"li\",\n  value: false,\n  icon: function() {\n    return (this.get(\"value\")) ? \"icon check\" : \"icon multiply\";\n  }.property(\"value\"),\n  click: function() {\n    this.toggleProperty(\"value\");\n  }\n});\n\nTodos.Checkbox = Ember.View.extend({\n  classNames: ['checkbox left'],\n  \n  tagName: 'input',\n  \n  attributeBindings: ['type', 'min', 'max', 'value'],\n  \n  type: \"range\",\n  min: false,\n  max: true,\n  value: false,\n  \n  init: function() {\n    this._super();\n    this.on(\"change\", this, this._updateElementValue);\n  },\n  \n  _updateElementValue: function() {\n    console.log(\"updated!\");\n    this.set('value', this.$().val());\n  }\n});\n\nTodos.CreateTodoView = Ember.TextField.extend({\n  insertNewline: function() {\n    var value = this.get('value');\n\n    if (value) {\n      Todos.todosController.createTodo(value);\n      this.set('value', '');\n    }\n  }\n});\n\nTodos.MainView = Ember.View.extend({\n  elementId: \"main\",\n  tagName: \"section\",\n  templateName: 'main_view',\n  didInsertElement: function() {\n    Lungo.init({\n      name: 'todos'\n    });\n    \n    Lungo.Service.Settings.async = false;\n  }\n});\n\n})();\n//@ sourceURL=todos/app");