<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  align-items: center;
  background: var(--primary-light);
  border-radius: var(--border-radius);
  border: none;
  box-shadow: var(--box-shadow);
  display: flex;
  font-size: var(--font-medium);
  gap: var(--space-sm);
  justify-content: space-between;
  padding: var(--space-sm);
}
</style>
