# 一、vue-property-decorator

- 这个组件完全依赖于`vue-class-component`.它具备以下几个属性:
  - @Component (完全继承于`vue-class-component`)
  - @Emit

  - @Inject
  - @Provice
  - @Prop

  - @Watch
  - @Model
  - Mixins  (在`vue-class-component`中定义);

## 1.1 @component

- 当我们在`vue`单文件中使用`TypeScript`时,引入`vue-property-decorator`之后,`script`中的标签就变为这样:

  ```js
  @Component({})
  export default class "组件名" extends Vue{
    ValA: string = "hello world";
    ValB: number = 1;
  }
  ```

  - 等价于

  ```js
  export default {
    data(){
      return {
        ValA: 'hello world',
        ValB: 1
      }
    }
  }
  ```

- 对于`data`里的变量，我们可以直接按`ts`定义类变量的写法写就可以。那么如果是计算属性呢? 这就要用到`getter`了。对于`Vue`中的计算属性,我们只需要将该计算属性名定义为一个函数,并在函数前加上`get`关键字即可.

  ```js
  @Component({})
  export default class "组件名" extends Vue{
    get ValA(){
      return 1;
    }
  }
  ```

  - 等价于

  ```js
  export default {
    computed: {
      ValA: function() {
        return 1;
      }
    }
  }
  ```

  

## 1.2 @Emit

- 关于`Vue`中的事件的监听与触发,`Vue`提供了两个函数`$emit`和`$on`.那么在`vue-property-decorator`中如何使用呢？这就需要用到`vue-property-decorator`提供的`@Emit`属性.

  ```js
  import {Vue, Component, Emit} from 'vue-property-decorator';
  
  @Component({})
  export default class "组件名" extends Vue{
    mounted(){
      this.$on('emit-todo', function(n) {
        console.log(n)
      })
  
      this.emitTodo('world');
    }
  
    @Emit()
    emitTodo(n: string){
      console.log('hello');
    }
  }
  ```

  - 等价于

  ```js
  export default {
    mounted(){
      this.$on('emit-todo', function(n) {
        console.log(n)
      })
  
      this.emitTodo('world');
    },
    methods: {
      emitTodo(n){
        console.log('hello');
        this.$emit('emit-todo', n);
      }
    }
  }
  ```

- 运行上面的代码会打印 'hello'   'world'

- 可以看到,在`@Emit`装饰器的函数会在运行之后触发等同于其函数名(`驼峰式会转为横杠式写法`)的事件, 并将其函数传递给`$emit`.

- 如果我们想触发特定的事件呢,比如在`emitTodo`下触发`reset`事件:

  ```ts
  import {Vue, Component, Emit} from 'vue-property-decorator';
  
  @Component({})
  export default class "组件名" extends Vue{
    @Emit('reset')
    emitTodo(n: string){
  
    }
  }
  ```

  - 我们只需要给装饰器`@Emit`传递一个事件名参数`reset`,这样函数`emitTodo`运行之后就会触发`reset`事件.

- 总结：

  > - 在`Vue`中我们是使用`$emit`触发事件,使用`vue-property-decorator`时,可以借助`@Emit`装饰器来实现.`@Emit`修饰的函数所接受的参数会在运行之后触发事件的时候传递过去. `@Emit`触发事件有两种写法：
  >   -  `@Emit()`不传参数,那么它触发的事件名就是它所修饰的函数名.
  >   - `@Emit(name: string)`,里面传递一个字符串,该字符串为要触发的事件名.



## 1.3 @Watch

- 我们可以利用`vue-property-decorator`提供的`@Watch`装饰器来替换`Vue`中的`watch`属性,以此来监听值的变化.

  ```tsx
  import {Vue, Component, Watch} from 'vue-property-decorator';
  
  @Watch('child')
  onChangeValue(newVal: string, oldVal: string){
      // todo...
  }
  
  @Watch('person', {immediate: true, deep: true})
  onChangeValue(newVal: Person, oldVal: Person){
      // todo...
  }
  ```

  - 等价于

  ```tsx
  export default{
    watch: {
      'child': this.onChangeValue, // 这种写法默认 `immediate`和`deep`为`false`
      'person': {
        handler: 'onChangeValue',
        immediate: true,
        deep: true
      }
    },
    methods: {
      onChangeValue(newVal, oldVal){
        // todo...
      }
    }
  }
  ```

- `@Watch`使用非常简单,接受第一个参数为要监听的属性名 第二个属性为可选对象.`@Watch`所装饰的函数即监听到属性变化之后的操作.



## 1.4 @Prop

- 我们在使用`Vue`时有时会遇到子组件接收父组件传递来的参数.我们需要定义`Prop`属性.比如子组件从父组件接收三个属性`propA`,`propB`,`propC`.
  -  `propA`类型为`Number` 
  -  `propB`默认值为`default value` 
  -  `propC`类型为`String`或者`Boolean`

  ```tsx
  import {Vue, Component, Prop} from 'vue-property-decorator';
  
  @Component({})
  // 这里 !和可选参数?是相反的, !告诉TypeScript我这里一定有值.
  // @Prop接受一个参数可以是类型变量或者对象或者数组.@Prop接受的类型比如Number是JavaScript的类型,之后定义的属性类型则是TypeScript的类型.
  export default class "组件名" extends Vue{
    @Prop(Number) propA!: number;
    @Prop({default: 'default value'}) propB!: string;
    @prop([String, Boolean]) propC: string | boolean;
  }
  ```

  - 等价于

  ```tsx
  export default {
    props: {
      propA: {
        type: Number
      },
      propB: {
        default: 'default value'
      },
      propC: {
        type: [String, Boolean]
      },
    }
  }
  ```

  

## 1.5 @Provide 提供 / @Inject 注入

- 父组件不便于向子组件传递数据，就把数据通过Provide传递下去，然后子组件通过Inject来获取

  ```js
  const symbol = Symbol('baz')
   
  export const MyComponent = Vue.extend({
   
    inject: {
      foo: 'foo',
      bar: 'bar',
      'optional': { from: 'optional', default: 'default' },
      [symbol]: symbol
    },
    data () {
      return {
        foo: 'foo',
        baz: 'bar'
      }
    },
    provide () {
      return {
        foo: this.foo,
        bar: this.baz
      }
    }
  })
  ```

  - 等价于：

  ```tsx
  import {Vue,Component,Inject,Provide} from 'vue-property-decorator';
   
  const symbol = Symbol('baz')
   
  @Component
  export defalut class MyComponent extends Vue{
      @Inject() foo!: string;
      
      @Inject('bar') bar!: string;
      
      @Inject({
          from:'optional',
          default:'default'
      }) optional!: string;
      
      @Inject(symbol) baz!: string;
      
      @Provide() foo = 'foo'
      
      @Provide('bar') baz = 'bar'
  }
  ```

  

























