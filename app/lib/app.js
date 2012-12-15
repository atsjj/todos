require('todos/templates/main_view');

Todos = Ember.Application.create();

Todos.Todo = Ember.Object.extend({
  title: null,
  isDone: false
});

Todos.todosController = Ember.ArrayController.extend({
  content: [],

  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
  },

  clearCompletedTodos: function() {
    this.removeObjects(this.filterProperty('isDone', true));
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  isEmpty: function() {
    return this.get('length') === 0;
  }.property('length'),

  allAreDone: function(key, value) {
    if (arguments.length === 2) {
      this.setEach('isDone', value);

      return value;
    } else {
      return !this.get('isEmpty') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
}).create();

Todos.CheckView = Ember.View.extend({
  tagName: "li",
  value: false,
  icon: function() {
    return (this.get("value")) ? "icon check" : "icon multiply";
  }.property("value"),
  click: function() {
    this.toggleProperty("value");
  }
});

Todos.Checkbox = Ember.View.extend({
  classNames: ['checkbox left'],
  
  tagName: 'input',
  
  attributeBindings: ['type', 'min', 'max', 'value'],
  
  type: "range",
  min: false,
  max: true,
  value: false,
  
  init: function() {
    this._super();
    this.on("change", this, this._updateElementValue);
  },
  
  _updateElementValue: function() {
    console.log("updated!");
    this.set('value', this.$().val());
  }
});

Todos.CreateTodoView = Ember.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Todos.todosController.createTodo(value);
      this.set('value', '');
    }
  }
});

Todos.MainView = Ember.View.extend({
  elementId: "main",
  tagName: "section",
  templateName: 'main_view',
  didInsertElement: function() {
    Lungo.init({
      name: 'todos'
    });
    
    Lungo.Service.Settings.async = false;
  }
});
