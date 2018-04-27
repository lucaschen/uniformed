<div align="center">
  <img src="https://raw.githubusercontent.com/parkroolucas/uniformed/master/logo.png" alt="Uniformed Logo" width="960">
</div>

# Uniformed ⚛️

I got really fed up with the way you do forms in React. I also don't like the sheer autocracy that other solutions tend to impose over the way you do forms.

So, I created **uniformed** as an attempted solution to all of these problems.

Its fundamental principle is being very, very...

<sub>small</sub>

It currently clocks in at 1.08kB gzipped, which is probably less than a tenth of the competition.

I'd argue that forms are so different, that it's really a bad idea to assume anything other than the most essential function of changing values in objects.

I do have plans to make Uniformed highly extensible, so that it becomes really easy to include stuff like pristine checking and error validation as simple "middlewares" or sorts. Do check back sometime soon.

## Getting Started

The most fundamental principle to **uniformed** is the storage and manipulation of a single, flat object. That's it. Nothing crazy at all.

Let's say I want to build a form that lets a user type in their **_name_** and their **_email address_**. In its most basic form (_ba-dum-tss_), this information can be represented as follows,

    {
      email: <some string>,
      name: <some string>
    }

And I really wanted to make sure that that type of raw simplicity was kept in **uniformed**. Everything you do in **uniformed** will revolve around the manipulation and retrieval of information in this simple, flat object. Nothing more.

## Syntax

**uniformed** works as a HOC (Higher-Order Component) that sits on top of your form. Let's go with that example of a name / email form, that currently looks something like this:

```JSX
import React from 'react';

const Form = () => {
  return (
    <form>
      <input placeholder="Name" type="text" />
      <input placeholder="Email" type="text" />
    </form>
  );
};

export default Form;
```

Step 1 would be doing this:

```JSX
import React from "react";
import { uniform } from "uniformed";

const Form = ({ uniformed: { handlers, state } }) => {
  return (
    <form>
      <input onChange={handlers.name} placeholder="Name" type="text" value={state.name} />
      <input onChange={handlers.email} placeholder="Email" type="text" value={state.email} />
    </form>
  );
};

const configObj = {
  initialValues: {
    email: "",
    name: ""
  }
};

export default uniform(configObj)(Form);
```

This immediately binds the values for name and email into an internal "state" on the Higher-Order Component. It's that easy.

**uniformed** brings in a prop called **uniformed**, containing two properties:

* **handlers** - this is an object containing a bunch of handlers, methods that do stuff to the state (more correctly, _can_ do stuff to the state)
* **state** - this is an object containing all of the state values you specified in `initialValues`.

Wait a second, where did the two handlers come from? We didn't define those!

That's correct. **uniformed** automatically defines a handler for each key that you specify in `initialValues`, unless you override it with your own.

## Configuration

Right now the `uniformed` method takes a single parameter `configObj`, which takes two properties:

* `initialValues` - an object of key-value pairs. See above for the full gist of how this currently works. I'm planning to update this to include functional resolution as well, so stay tuned (or submit a pull request, why not)
* `handlers` - an object of key-value pairs. The value of each should be a method, which will be called every time the handler is called (generally on the `onChange` event). The handler will be called with a single argument `handlerArgObj`, containing: - `props` - a direct passthrough of the component's props. - `state` - a set of all the current values of the form. - **Up to 1 dynamic property** - if the handler's key also exists in `initialValues`, a `$`-prefixed property will be passed with the new value of that property passed in. For example, if a handler is defined under `name` where this is also found in `initialValues`, then when this handler is run, a `$name` property will also be passed in, with the new value that is to be assigned to the `name` field. **Note that when the handler method is called, the value hasn't been changed in the form state yet - you will need to do this yourself using the update method (see next dot point)** - `update` - this method can be called multiple times, and takes in a single object. When called, the keys in this object will be overlayed over the existing form state, updating one or more values in the form.

Let's refer to our previous example:

```JSX
import React from "react";
import { uniform } from "uniformed";

const Form = ({ uniformed: { handlers, state } }) => {
  return (
    <form>
      <input onChange={handlers.name} placeholder="Name" type="text" value={state.name} />
      <input onChange={handlers.email} placeholder="Email" type="text" value={state.email} />
    </form>
  );
};

const configObj = {
  initialValues: {
    email: "",
    name: ""
  }
};

export default uniform(configObj)(Form);
```

Let's say we want to update the email address to `<name>@gmail.com` whenever the name is changed:

```JSX
import React from "react";
import { uniform } from "uniformed";

const Form = ({ uniformed: { handlers, state } }) => {
  return (
    <form>
      <input onChange={handlers.name} placeholder="Name" type="text" value={state.name} />
      <input onChange={handlers.email} placeholder="Email" type="text" value={state.email} />
    </form>
  );
};

const configObj = {
  handlers: {
    name: ({ $name, props, state, update }) => {
      return update({
        email: $name + "@gmail.com",
        name: $name // you need to do this so that the name can actually change
      });
    }
  },
  initialValues: {
    email: "",
    name: ""
  }
};

export default uniform(configObj)(Form);
```

This type of simple, non-restrictive design allows us to do special promise magic here too!

```JSX
handlers: {
  name: async ({ $name, props, state, update }) => {
    await firstPromise();
    update({
      anything: "you want"
    })
    await secondPromise();
    return update({
      anything: "you want"
    });
  }
}
```

I think that gives **uniformed** a special level of power over other React form libraries, simply because of how little it assumes.

## License

&copy; Lucas Chen, 2018. MIT licensed.
