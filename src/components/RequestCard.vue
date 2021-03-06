<script>
  import { computed } from "vue";

  export default {
    name: "RequestCard",
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    emits: [
      "select",
    ],
    setup(props, { emit }) {
      const statusType = computed(() => {
        if (props.data.response.status < 0 && props.data.response.status < 200) {
          return "info";
        }

        if (props.data.response.status > 199 && props.data.response.status < 300) {
          return "success";
        }

        if (props.data.response.status > 299 && props.data.response.status < 400) {
          return "info";
        }

        if (props.data.response.status > 399 && props.data.response.status < 500) {
          return "warning";
        }

        if (props.data.response.status > 499
          // eslint-disable-next-line no-underscore-dangle
          || (props.data.response.status === 0 && props.data.response._error)) {
          return "error";
        }

        return "unknown";
      });

      const status = computed(() => {
        if (props.data.response.status === 0) {
          // eslint-disable-next-line no-underscore-dangle
          if (props.data.response._error) {
            // eslint-disable-next-line no-underscore-dangle
            return props.data.response._error.replace("net::", "");
          }

          return "UNKNOWN";
        }

        return props.data.response.status;
      });

      const onSelect = () => emit("select");
      const calcDuration = x => `${Math.round(x)} ms`;

      return {
        onSelect,
        calcDuration,
        statusType,
        status,
      };
    },
  };
</script>

<template>
  <div
    class="request-card"
    :class="{ active }"
    @click="onSelect"
  >
    <div class="details">
      <b v-text="data.request.method" />
      <span v-text="calcDuration(data.time)" />
      <span v-text="data._resourceType" />
      <div :class="`tag tag-${statusType}`">
        <b v-text="status" />
      </div>
    </div>
    <div
      class="url"
      v-text="data.request.url.split('?')[0]"
    />
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .request-card {
    cursor: pointer;
    background-color: var(--color-background-dark);
    border-color: var(--color-background-dark);
    border-radius: .25rem;
    border-width: 2px;
    border-style: dashed;
    color: var(--color-text);
    padding: 1rem;

    &.active {
      background-color: var(--color-active) !important;
      border-color: var(--color-active) !important;
      color: #f8f9fa;
    }

    @media (min-width: 476px) {
      &:hover {
        background-color: var(--color-background);
        border-color: var(--color-primary-light);
      }
    }

    & > .details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: .3rem;
    }

    & > .url {
      overflow-wrap: anywhere;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & .tag {
      border-radius: 5px;
      padding: .2em .33em;
      width: max-content;
      color: #ffffff;
    }

    & .tag-unknown {
      background-color: var(--color-background);
      color: var(--color-text);
    }

    & .tag-success {
      background-color: var(--color-success);
    }

    & .tag-info {
      background-color: var(--color-info);
    }

    & .tag-warning {
      background-color: var(--color-warning);
      color: var(--color-warning-text);
    }

    & .tag-error {
      background-color: var(--color-error);
      color: var(--color-error-text);
    }
  }
</style>
