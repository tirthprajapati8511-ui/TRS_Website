import { SectionCard, ImageUploadField } from "../fields";

export default function BrandEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Branding"
      description="Real brand assets — upload the actual logo files here, not a redrawn or generated version."
    >
      <ImageUploadField
        label="TRS BVM logo"
        value={value.trsLogo}
        onChange={(path) => set({ trsLogo: path })}
      />
      <ImageUploadField
        label="BVM college logo"
        value={value.bvmLogoLight}
        onChange={(path) => set({ bvmLogoLight: path })}
      />
    </SectionCard>
  );
}
