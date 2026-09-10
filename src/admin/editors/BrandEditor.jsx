import { SectionCard, ImageUploadField } from "../fields";

export default function BrandEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Branding"
      description="Real brand assets — upload the actual logo files here, not a redrawn or generated version. The BVM college seal needs two versions since it has a solid background: one for light mode, one for dark, so it never shows as a white or black box."
    >
      <ImageUploadField
        label="TRS BVM logo"
        value={value.trsLogo}
        onChange={(path) => set({ trsLogo: path })}
      />
      <ImageUploadField
        label="BVM college logo — light mode"
        value={value.bvmLogoLight}
        onChange={(path) => set({ bvmLogoLight: path })}
      />
      <ImageUploadField
        label="BVM college logo — dark mode"
        value={value.bvmLogoDark}
        onChange={(path) => set({ bvmLogoDark: path })}
      />
    </SectionCard>
  );
}
